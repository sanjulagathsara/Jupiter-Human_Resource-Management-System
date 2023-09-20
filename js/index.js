console.log('Hello World');
console.log('Hello World2');

let name = "Sanjula";
console.log(name);
 



const button = document.querySelector('.sparkle-button button');

button.addEventListener('click', function(e) {
  const sparkle = document.createElement('span');
  sparkle.classList.add('sparkle');
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';
  this.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 2000);
});


