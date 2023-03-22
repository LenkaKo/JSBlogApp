'use strict';
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

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
    
  const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleAuthorSelector ='.post-author',
        optArticleTagsSelector = '.post-tags .list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-',
        optTagsListSelector = '.list-tags';

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector);
  
  let html = '';

  for(let article of articles){

    const articleId = article.getAttribute('id');
    //console.log(articleId);
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    titleList.innerHTML = titleList.innerHTML + linkHTML;

     html = html + linkHTML;
    }
    titleList.innerHTML = html;
  }
  
 generateTitleLinks();

 const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
   // console.log(links)
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
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  } 

  function generateTags(){

  let allTags = {};

    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    for(let article of articles){
  
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      //console.log(tagWrapper);

      let html = '';
  
      const articleTags = article.getAttribute('data-tags');
      //console.log(articleTags);

      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTagsArray);
      for (let tag of articleTagsArray){ 
        let TagHTML = '<li><a href="#tag-' + tag +'"><span>' + tag + '</span></a></li>';
        html = html + TagHTML;
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

const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams: ', tagsParams);

let allTagsHTML = '';
for (let tag in allTags){
  allTagsHTML += tagLinkHTML;

  //const tagLinkHTML =  calculateTagClass(allTags[tag], tagsParams);
  //console.log('tagLinkHTML:', tagLinkHTML);

  const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
  console.log('tagLinkHTML:', tagLinkHTML);
}
//tagList.innerHTML = allTagsHTML;
tagList.innerHTML = allTags.join(' ');
console.log(allTags);
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
    
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for( let tagLink of tagLinks){
      tagLink.classList.add('active');
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
  const authorList = document.querySelector(optArticleAuthorSelector);
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
    
  let html = '';
   for(let article of articles){
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);
    let authorHTML = '<li><a href="#author' + articleAuthor +'"><span>' + articleAuthor + '</span></a></li>';
    //console.log(authorHTML);
    authorList.innerHTML = authorHTML;
    //console.log(html);
    }
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
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log(authorLinks);
  for ( let authorLink of authorLinks){
    authorLink.classList.add('active');
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