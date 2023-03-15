'use strict';
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
  
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    //console.log(clickedElement);

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');
    //console.log(articleSelector);
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
    
  const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleAuthorSelector ='.post-author',
        optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  let html = '';

  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);
    /* find and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;

     /* insert link into html variable */
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

  function generateTags(){

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    /* START LOOP: for every article: */
    for(let article of articles){
  
      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      //console.log(tagWrapper);

      /* make html variable with empty string */
      let html = '';
  
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){ 
        /* generate HTML of the link */
        let TagHTML = '<li><a href="#tag-' + tag +'"><span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
        html = html + TagHTML;
       // console.log(html);
      }
      /* END LOOP: for each tag */
      
      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.insertAdjacentHTML('beforeend', html);
    /* END LOOP: for every article: */
  }
  
}
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    
    /* START LOOP: for each active tag link */
    for(let tagActiveLink of tagActiveLinks){
    
      /* remove class active */
      tagActiveLink.classList.remove('active');
    
      /* END LOOP: for each active tag link */
    }
    
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    
    /* START LOOP: for each found tag link */
    for( let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]')

  }

  
  function addClickListenersToTags(){
    /* find all links to tags */
    const tags = document.querySelectorAll('.post-tags a');
    /* START LOOP: for each link */
    for(let tag of tags){
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
  
  addClickListenersToTags();

  function generateAuthors(){
  /* remove contents of titleList */
  const authorList = document.querySelector(optArticleAuthorSelector);
  /* find all authors */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
    
  let html = '';
   /* START LOOP: for every author: */
   for(let article of articles){
    
    /* get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);

    /* generate HTML of the link */
    let authorHTML = '<li><a href="#author' + articleAuthor +'"><span>' + articleAuthor + '</span></a></li>';
    //console.log(authorHTML);
    /* add generated code to html variable */
    authorList.innerHTML = authorHTML;
    //console.log(html);
    }
  }
  

  generateAuthors();

  
function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  const clickedAuthor = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedAuthor.getAttribute('href');
  //console.log(href);
  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('author-', '');
  //console.log(author);
  /* find all author links with class active */
  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for (let authorActiveLink of authorActiveLinks){
    /* remove class active */
    authorActiveLink.classList.remove('active');
    //console.log(authorActiveLink)
  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log(authorLinks);

  /* START LOOP: for each found tag link */
  for ( let authorLink of authorLinks){
  /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
    /* execute function "generateAuthors" with article selector as argument */
    generateAuthors('[data-author="' + author + '"]')
  }
  

function addClickListenersToAuthors(){
  /* find all links to tags */
  const authors = document.querySelectorAll('.post-author a');
  console.log(authors)

  /* START LOOP: for each link */
  for(let author of authors){
  /* add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  /* END LOOP: for each author */
}
 
}

addClickListenersToAuthors();
