window.onload=function(){
  if(sessionStorage.getItem('status')!=='login'){
    location.href="login.html"
  }
}