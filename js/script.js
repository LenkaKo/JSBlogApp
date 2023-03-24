'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-article').innerHTML),
    authorArticle: Handlebars.compile(document.querySelector('#template-author-article').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
  };

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
//console.log('Link was clicked!');
  const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
  clickedElement.classList.add('active');
//console.log(clickedElement);
  const activeArticles = document.querySelectorAll('.post');
//console.log(articleSelector);
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
  const articleSelector = clickedElement.getAttribute('href');
//console.log(articleSelector);
  const targetArticle = document.querySelector(articleSelector);
//console.log(targetArticle);
  targetArticle.classList.add('active');
  };
    
  const opts = {
    ArticleSelector: '.post',
    TitleSelector: '.post-title',
    TitleListSelector: '.titles',
    ArticleTagsSelector: '.post-tags .list',
    AuthorSelector: '.post-author',
    AuthorListSelector: '.authors.list',
    TagListSelector: '.tags.list',
    CloudClassCount: 5,
    CloudClassPrefix: 'tag-size-'
  };

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(opts.TitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(opts.ArticleSelector);
  let html = '';
    for(let article of articles){
      const articleId = article.getAttribute('id');
    //console.log(articleId);
      const articleTitle = article.querySelector(opts.TitleSelector).innerHTML;
      const linkHTMLData = {id: articleId, title: articleTitle};
    //console.log(linkHTML);
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + linkHTML;
      titleList.innerHTML = html;
    }
}  
 generateTitleLinks();

 const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  //console.log(links)
  }

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 99999
  };
    for (let tag in tags) {
      params.max = tags[tag];
      if(tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if(tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.CloudClassCount - 1) + 1);
  return opts.CloudClassPrefix + classNumber;
} 

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll(opts.ArticleSelector);
//console.log(articles);
    for(let article of articles){
      const tagWrapper = article.querySelector(opts.ArticleTagsSelector);
    //console.log(tagWrapper);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);
      const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
      for (let tag of articleTagsArray){ 
        const tagHTMLdata = {inner: tag, tagName: tag};
        const tagHTML = templates.tagLink(tagHTMLdata);
        html = html + tagHTML;
      // console.log(html);
        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      //allTags.push(linkHTML);
      }
      tagWrapper.insertAdjacentHTML('beforeend', html);
      }

  const tagList = document.querySelector(opts.TagListSelector);
  const tagsParams = calculateTagsParams(allTags);
//console.log('tagsParams: ', tagsParams);

  const allTagsData = {tags: []};
    for (let tag in allTags) {
      allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

  function tagClickHandler(event){
    event.preventDefault();
  
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    
    for(let tagActiveLink of tagActiveLinks){
      tagActiveLink.classList.remove('active');
    }
    
    const getHref = document.querySelectorAll(href);
    for (let tag of getHref) {
      tag.classList.add('active');
    }
  
    generateTitleLinks('[data-tags~="' + tag + '"]')
  }

  function addClickListenersToTags(){
    const tags = document.querySelectorAll('.post-tags a');
    
    for(let tag of tags){
      tag.addEventListener('click', tagClickHandler);
    }
}  
addClickListenersToTags();

function generateAuthors(){
  let allAuthors = [];
  const articles = document.querySelectorAll(opts.ArticleSelector);
//console.log(articles);  

    for(let article of articles){
      let html = '';
      const authorHTML = article.querySelector(opts.AuthorSelector);
      const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);
      const authorLinkHTMLData = {id: articleAuthor, author: articleAuthor};
      const authorLinkHTML = templates.authorArticle(authorLinkHTMLData);
      const authorLinkListHTMLData = {href: articleAuthor, name: articleAuthor};
      const authorLinkListHTML = templates.authorLink(authorLinkListHTMLData);

      if(allAuthors.indexOf(authorLinkListHTML) == -1) {
        allAuthors.push(authorLinkListHTML);
      }

      html =  html + authorLinkHTML;
      authorHTML.innerHTML = html;
    }
  const authorsList = document.querySelector(opts.AuthorListSelector);
  authorsList.innerHTML = allAuthors.join(' ');
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedAuthor = this;
  const href = clickedAuthor.getAttribute('href');
  //console.log(href);
  const author = href.replace('author-', '');
  //console.log(author);
  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');

    for (let authorActiveLink of authorActiveLinks){
      authorActiveLink.classList.remove('active');
    //console.log(authorActiveLink)
    }

  const getHref = document.querySelectorAll(href);
    for (let href of getHref) {
      href.classList.add('.active');
    }
    generateAuthors('[data-author="' + author + '"]')
}
  
function addClickListenersToAuthors(){
  const authors = document.querySelectorAll('.post-author a');
//console.log(authors)

  for(let author of authors){
    author.addEventListener('click', authorClickHandler);
  } 
}
addClickListenersToAuthors();
