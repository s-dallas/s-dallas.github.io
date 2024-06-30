
function clearForm() {
    document.getElementById("contact-form").reset();
}

function setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 100,
        tempTypeSpeed = 0;

    var type = function () {

        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }

        cursorPosition += 1;
        if (cursorPosition < HTML.length) {
            setTimeout(type, tempTypeSpeed);
        }

    };



    return {
        type: type
    };
}

var typewriters = document.querySelectorAll('#typewriter');


typewriters.forEach(function (typewriter) {
    typewriter = setupTypewriter(typewriter);



    typewriter.type();



});



/* scroll bar for leetcode */
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle');

    let targetNumber = document.getElementById('target-number').value;
    let scrollContainer =
        document.getElementById('scroll-container');
    let scrollSpeed = 50;
    let scrollInterval;
    let maxSpeed = 3000;
    let completed = [977,1431,1295,1089,88,27];
    let numExercises = 2300;

    for (let i = 1; i <= numExercises; i++) {
        let li = document.createElement('a');
        li.href = i + '.html';
        let ex = document.createElement('div');   
        let tx = document.createElement('div');   
        ex.className = 'scroll-item';
        tx.classList.add('d-flex'); 
        tx.classList.add('justify-content-center');
        tx.classList.add('align-items-baseline');
        tx.classList.add('syne-mono-regular');
        tx.classList.add('mt-3');     
        tx.textContent = i;      
        ex.setAttribute('data-number', i);
        if (!(completed.includes(i))) {
            ex.classList.add('scroll-item');
            ex.classList.add('d-flex');
            ex.classList.add('justify-content-center');            
            ex.classList.add('align-items-start');               
        } else {
            ex.classList.remove('scroll-item');
            ex.classList.add('scroll-item-c');
            let check = document.createElement('div');
            check.className = 'check';          
            let checkIcon = document.createElement('div');
            checkIcon.className = 'check-icon';               
            check.appendChild(checkIcon);       
            ex.appendChild(check)
        }
        ex.appendChild(tx);
        li.appendChild(ex);
        scrollContainer.appendChild(li);
     }
     let targetItem = document.querySelector(`.scroll-item-c[data-number="${targetNumber}"]`);
     console.log(targetItem);
     
     if (targetItem) {
         // Scroll to the target item
         
         scrollContainer.scrollLeft = targetItem.offsetLeft - scrollContainer.offsetLeft - 200;
     }
 

    function scrollLeft() {
        clearInterval(scrollInterval);
        scrollSpeed = 1;
        scrollInterval = setInterval(() => {
            scrollContainer.scrollLeft -= scrollSpeed;

            if (scrollSpeed < maxSpeed) {
                increaseSpeed();
            }
        }, 50);
    }


    function scrollRight() {
        clearInterval(scrollInterval);
        scrollSpeed = 1;
        scrollInterval = setInterval(() => {
            scrollContainer.scrollLeft += scrollSpeed;
            if (scrollSpeed < maxSpeed) {
                increaseSpeed();
            }
        }, 50);
    }

    function increaseSpeed() {
        setTimeout(() => {
            scrollSpeed += 10;
        }, 100);
    }

    function stopScroll() {
        clearInterval(scrollInterval);
    }


    document.querySelector('.scroll-button.left').addEventListener('mousedown', scrollLeft);
    document.querySelector('.scroll-button.right').addEventListener('mousedown', scrollRight);
    document.querySelector('.scroll-button.left').addEventListener('mouseup', stopScroll);
    document.querySelector('.scroll-button.right').addEventListener('mouseup', stopScroll);
    document.querySelector('.scroll-button.left').addEventListener('mouseleave', stopScroll);
    document.querySelector('.scroll-button.right').addEventListener('mouseleave', stopScroll);
});

document.addEventListener("DOMContentLoaded", function() {
    let targetNumber = document.getElementById('target-number').value;
});