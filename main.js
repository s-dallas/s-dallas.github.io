
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
    let completed = [977, 1431, 1295, 1089, 88, 27, 26, 1346, 941, 1299, 26.2];
    completed.sort(function (a, b) {
        return a - b;
    });

    let targetItem = document.querySelector(`.scroll-item-curr[data-number="${targetNumber}"]`);

    for (let i = 0; i < completed.length; i++) {
        let li = document.createElement('a');
        li.href = completed[i] + '.html';
        let ex = document.createElement('div');
        let tx = document.createElement('div');
        ex.className = 'scroll-item-c';
        tx.classList.add('d-flex');
        tx.classList.add('justify-content-center');
        tx.classList.add('align-items-baseline');
        tx.classList.add('syne-mono-regular');
        tx.classList.add('mt-3');
        tx.textContent = completed[i];
        ex.setAttribute('data-number', completed[i]);

        let check = document.createElement('div');
        check.className = 'check';
        let checkIcon = document.createElement('div');
        checkIcon.className = 'check-icon';
        check.appendChild(checkIcon);
        ex.appendChild(check)
        ex.appendChild(tx);
        li.appendChild(ex);
        scrollContainer.appendChild(li);


        if (completed[i] == targetNumber) {
            ex.classList.remove('scroll-item-c');
            ex.classList.add('scroll-item-curr')
        }

    }


    const container = document.getElementById('scroll-container');
    const currentItem = container.getElementsByClassName('scroll-item-curr');


    const containerWidth = container.offsetWidth;
    const itemWidth = currentItem.offsetWidth;

    const scrollPosition = currentItem.offsetLeft - (containerWidth / 2) + (itemWidth / 2);

    container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });




    /* TYPING EFFECT */

    function typeWriterEffect(elementId, htmlText, speed) {
        let element = document.getElementById(elementId);
        if (!element) return;

        let cursor = document.getElementById('cursor'); // Get the cursor element
        if (!cursor) return;

        cursor.style.display = 'inline-block'; // Display cursor

        let htmlIndex = 0;
        let textBuffer = '';

        // Function to update text and cursor
        function updateText() {
            if (htmlIndex < htmlText.length) {
                if (htmlText[htmlIndex] === '<') {
                    // Append the whole tag (including < and >) to maintain HTML structure
                    let tag = '';
                    while (htmlText[htmlIndex] !== '>') {
                        tag += htmlText[htmlIndex];
                        htmlIndex++;
                    }
                    tag += htmlText[htmlIndex]; // Append the closing '>'
                    textBuffer += tag;
                } else {
                    textBuffer += htmlText[htmlIndex];
                }
                element.innerHTML = textBuffer + '<span id="cursor">&#x2588;</span>';
                htmlIndex++;
            } else {
                clearInterval(typingInterval);
                cursor.style.display = 'none'; // Hide cursor when typing ends 
            }
        }

        // Call updateText function every `speed` milliseconds
        let typingInterval = setInterval(updateText, speed);
    }

    // LC Solutions Data
    let codeSegments = {
        26.2: `
<span class="keyword">class</span> <span class="function">Solution</span>(<span class="keyword">object</span>):
    <span class="keyword">def</span> <span class="function">removeDuplicates</span>(<span class="keyword">self</span>, <span class="variable">nums</span>):
        <span class="comment">"""
        :type nums: List[int]
        :rtype: int
        """</span>
        <span class="variable">last</span> = <span class="variable">nums</span>[<span class="number">0</span>]
        <span class="variable">i</span> = <span class="number">1</span>
        <span class="variable">size</span> = <span class="number">1</span>
        
        <span class="comment"># edge cases</span>
        <span class="keyword">if</span> (<span class="punctuation">(</span><span class="function">len</span>(<span class="variable">nums</span>) <span class="operator">==</span> <span class="number">1</span><span class="punctuation">)</span>:
            <span class="keyword">return</span> <span class="number">1</span>
        <span class="keyword">if</span> (<span class="punctuation">(</span><span class="function">len</span>(<span class="variable">nums</span>) <span class="operator">==</span> <span class="number">2</span><span class="punctuation">)</span>:
            <span class="keyword">if</span> (<span class="punctuation">(</span><span class="variable">nums</span>[<span class="number">0</span>] <span class="operator">==</span> <span class="variable">nums</span>[<span class="number">1</span>]<span class="punctuation">)</span>:
                <span class="keyword">return</span> <span class="number">1</span><span class="punctuation">;</span>
            <span class="keyword">else</span>:
                <span class="keyword">return</span> <span class="number">2</span><span class="punctuation">;</span>
        
        <span class="keyword">for</span> <span class="variable">s</span> <span class="keyword">in</span> <span class="keyword">range</span> <span class="punctuation">(</span><span class="number">1</span>, <span class="keyword">len</span>(<span class="variable">nums</span>)):   
            
            <span class="comment"># duplicates - increment i</span>
            <span class="keyword">while</span> (<span class="punctuation">(</span><span class="variable">i</span> <span class="operator"><</span> <span class="function">len</span>(<span class="variable">nums</span>) <span class="operator">and</span> <span class="variable">nums</span>[<span class="variable">i</span>] <span class="operator">==</span> <span class="variable">last</span><span class="punctuation">)</span>:
                <span class="variable">i</span> <span class="operator">+=</span> <span class="number">1</span>
                <span class="keyword">continue</span>
                
            <span class="comment"># end of array, no new uniques</span>
            <span class="keyword">if</span> (<span class="punctuation">(</span><span class="variable">i</span> <span class="operator">&gt;=</span> <span class="function">len</span>(<span class="variable">nums</span>)<span class="punctuation">)</span>:
                <span class="keyword">return</span> <span class="variable">size</span>
            
            <span class="variable">nums</span>[<span class="variable">s</span>] = <span class="variable">nums</span>[<span class="variable">i</span>]
            <span class="variable">last</span> = <span class="variable">nums</span>[<span class="variable">s</span>]
            <span class="variable">size</span> <span class="operator">+=</span> <span class="number">1</span>
            <span class="variable">s</span> <span class="operator">+=</span> <span class="number">1</span>
            <span class="variable">i</span> <span class="operator">+=</span> <span class="number">1</span>
                    
        <span class="keyword">return</span> <span class="variable">size</span>`,
        88: `
<span class="token keyword">class</span> Solution(<span class="token keyword">object</span>):
    <span class="token keyword">def</span> merge(self, nums1, m, nums2, n):
        <span class="token comment">"""
        :type nums1: List[int]
        :type m: int
        :type nums2: List[int]
        :type n: int
        :rtype: None Do not return anything,
                modify nums1 in-place instead.
        """</span>
        p = m
        c = p
        <span class="token keyword">for</span> num2 <span class="token keyword">in</span> nums2:
            nums1[p] = num2
            <span class="token keyword">while</span> (c > <span class="token number">0</span> <span class="token keyword">and</span> nums1[c] < nums1[c-<span class="token number">1</span>]):
                nums1[c] = nums1[c-<span class="token number">1</span>]
                nums1[c-<span class="token number">1</span>] = num2
                c -= <span class="token number">1</span>
            p += <span class="token number">1</span>
            c = p
        `,
        941: `
<span class="keyword">class</span> Solution<span class="operator">(</span><span class="keyword">object</span><span class="operator">):</span>
    <span class="keyword">def</span> validMountainArray<span class="operator">(</span>self, arr<span class="operator">):</span>
        <span class="string">"""</span>
        <span class="string">:type arr: List[int]</span>
        <span class="string">:rtype: bool</span>
        <span class="string">"""</span>
        last <span class="operator">=</span> arr[<span class="number">0</span>]
        
        i <span class="operator">=</span> <span class="number">1</span>

        <span class="comment"># increasing check</span>
        <span class="keyword">while</span> i <span class="operator">&lt;</span> <span class="keyword">len</span>(arr)<span class="operator">:</span>
            <span class="keyword">if</span> arr[i] <span class="operator">&gt;</span> last<span class="operator">:</span>
                last <span class="operator">=</span> arr[i]
                i <span class="operator">+=</span> <span class="number">1</span>                                
                <span class="keyword">continue</span>
            <span class="keyword">else</span><span class="operator">:</span>
                <span class="keyword">break</span>
                
        <span class="keyword">if</span> i <span class="operator">==</span> <span class="keyword">len</span>(arr)<span class="operator">:</span>
            <span class="keyword">return</span> <span class="keyword">False</span>
                
        <span class="comment"># didn't move, not increasing</span>
        <span class="keyword">if</span> i <span class="operator">==</span> <span class="number">1</span><span class="operator">:</span>
            <span class="keyword">return</span> <span class="keyword">False</span>
        
        i <span class="operator">-=</span> <span class="number">1</span>
        
        last <span class="operator">=</span> arr[i]
        i <span class="operator">+=</span> <span class="number">1</span>

        <span class="comment"># decreasing check</span>
        <span class="keyword">while</span> i <span class="operator">&lt;</span> <span class="keyword">len</span>(arr)<span class="operator">:</span>
            <span class="keyword">if</span> arr[i] <span class="operator">&lt;</span> last<span class="operator">:</span>
                last <span class="operator">=</span> arr[i]
                i <span class="operator">+=</span> <span class="number">1</span>
                <span class="keyword">continue</span>
            <span class="keyword">else</span><span class="operator">:</span>
                <span class="keyword">break</span>
            
        
        <span class="keyword">if</span> i <span class="operator">==</span> <span class="keyword">len</span>(arr)<span class="operator">:</span>
            <span class="keyword">return</span> <span class="keyword">True</span>
        <span class="keyword">return</span> <span class="keyword">False</span>        
        
        `,
        1299: `
<span class="keyword">class</span> Solution<span class="operator">(</span><span class="keyword">object</span><span class="operator">):</span>
    <span class="keyword">def</span> replaceElements<span class="operator">(</span>self, arr<span class="operator">):</span>
        <span class="string">"""</span>
        <span class="string">:type arr: List[int]</span>
        <span class="string">:rtype: List[int]</span>
        <span class="string">"""</span>
        i <span class="operator">=</span> <span class="number">0</span>
        
        largest <span class="operator">=</span> <span class="number">0</span>
        largest_index <span class="operator">=</span> <span class="number">0</span>
        <span class="keyword">while</span> <span class="operator">(</span>i <span class="operator">&lt;</span> <span class="keyword">len</span>(arr)<span class="operator">-</span><span class="number">1</span><span class="operator">):</span>
            j <span class="operator">=</span> i <span class="operator">+</span> <span class="number">1</span>
            
            <span class="comment"># find largest</span>
            <span class="keyword">while</span> <span class="operator">(</span>j <span class="operator">&lt;</span> <span class="keyword">len</span>(arr)<span class="operator">):</span>
                <span class="keyword">if</span> <span class="operator">(</span>arr[j] <span class="operator">&gt;</span> largest<span class="operator">):</span>
                    largest <span class="operator">=</span> arr[j]
                    largest_index <span class="operator">=</span> j
                j <span class="operator">+=</span> <span class="number">1</span>
                
            <span class="comment"># auto-fill until index of largest reached</span>
            <span class="keyword">while</span> <span class="operator">(</span>i <span class="operator">&lt;</span> largest_index<span class="operator">):</span>
                arr[i] <span class="operator">=</span> largest
                i <span class="operator">+=</span> <span class="number">1</span>
            largest <span class="operator">=</span> <span class="number">0</span>
            largest_index <span class="operator">=</span> <span class="number">0</span>
                
        arr[<span class="operator">-</span><span class="number">1</span>] <span class="operator">=</span> <span class="operator">-</span><span class="number">1</span>
            
        <span class="keyword">return</span> arr
    `,
        1295: `
<span class="keyword">class</span> Solution(<span class="keyword">object</span>):
    <span class="keyword">def</span> findNumbers(self, nums):
        """
        <span class="comment">:type nums: List[int]</span>
        <span class="comment">:rtype: int</span>
        """
        <span class="variable">count</span> = <span class="number">0</span>
        <span class="keyword">for</span> <span class="variable">d</span> <span class="keyword">in</span> <span class="variable">nums</span>:
            <span class="variable">numD</span> = <span class="number">0</span>
            <span class="variable">division</span> = <span class="variable">d</span>
            <span class="keyword">while</span> (<span class="variable">division</span> > <span class="number">0</span>):
                <span class="variable">division</span> = <span class="function">math.floor</span>(<span class="variable">division</span> / <span class="number">10</span>)
                <span class="variable">numD</span> += <span class="number">1</span>
            <span class="keyword">if</span> (<span class="variable">numD</span> % <span class="number">2</span> == <span class="number">0</span>):
                <span class="variable">count</span> += <span class="number">1</span>
        <span class="keyword">return</span> <span class="variable">count</span>
        `,
        1089: `
<span class="token keyword">class</span> Solution(<span class="token keyword">object</span>):
    <span class="token keyword">def</span> duplicateZeros(self, arr):
        <span class="token comment">"""
        :type arr: List[int]
        :rtype: None Do not return anything, 
                modify arr in-place instead.
        """</span>
        i = <span class="token number">0</span>
        <span class="token keyword">while</span> (i < <span class="token function">len</span>(arr)):
            <span class="token keyword">if</span> (arr[i] != <span class="token number">0</span>):
                i += <span class="token number">1</span>
                <span class="token keyword">continue</span>
            <span class="token keyword">else</span>:
                j = <span class="token function">len</span>(arr) - <span class="token number">1</span>
                <span class="token keyword">while</span> (j > i):
                    arr[j] = arr[j-<span class="token number">1</span>]
                    j -= <span class="token number">1</span>
                i += <span class="token number">2</span>
                `,
        977: `
<span class="keyword">def</span> <span class="function">sortedSquares</span>(self, nums):
        """
        <span class="comment">:type nums: List[int]</span>
        <span class="comment">:rtype: List[int]</span>
        """

        squares = []

        <span class="keyword">if</span> (<span class="operator">(</span>len(nums) == <span class="number">1</span><span class="operator">)</span>:
            squares.append(nums[<span class="number">0</span>]<span class="operator">*</span>nums[<span class="number">0</span>])
        <span class="keyword">elif</span> (<span class="operator">(</span>len(nums) == <span class="number">2</span><span class="operator">)</span>:
            <span class="keyword">if</span> (<span class="operator">(</span>nums[<span class="number">0</span>]<span class="operator">*</span>nums[<span class="number">0</span>]) <span class="operator">&lt;</span> (nums[<span class="number">1</span>]<span class="operator">*</span>nums[<span class="number">1</span>]<span class="operator">)</span>:
                squares.append(nums[<span class="number">0</span>]<span class="operator">*</span>nums[<span class="number">0</span>])
                squares.append(nums[<span class="number">1</span>]<span class="operator">*</span>nums[<span class="number">1</span>])                
            <span class="keyword">else</span>:
                squares.append(nums[<span class="number">1</span>]<span class="operator">*</span>nums[<span class="number">1</span>])
                squares.append(nums[<span class="number">0</span>]<span class="operator">*</span>nums[<span class="number">0</span>])
        <span class="keyword">elif</span> (<span class="operator">(</span>nums[<span class="operator">-</span><span class="number">1</span><span class="operator">]</span> <span class="operator">&lt;</span> <span class="number">0</span><span class="operator">)</span>:
            i = len(nums)<span class="operator">-</span><span class="number">1</span>
            <span class="keyword">while</span> (<span class="operator">(</span>i <span class="operator">&gt;=</span> <span class="number">0</span><span class="operator">)</span>:
                squares.append(nums[i]<span class="operator">*</span>nums[i])
                i <span class="operator">-=</span> <span class="number">1</span>
        <span class="keyword">elif</span> (<span class="operator">(</span>nums[<span class="number">0</span>]<span class="operator">&gt;=</span> <span class="number">0</span><span class="operator">)</span>:
            i = <span class="number">0</span>
            <span class="keyword">while</span> (<span class="operator">(</span>i <span class="operator">&lt;</span> len(nums)<span class="operator">)</span>:
                squares.append(nums[i]<span class="operator">*</span>nums[i])
                i <span class="operator">+=</span> <span class="number">1</span>
            
        <span class="keyword">else</span>:

            i  = len(nums)<span class="operator">/</span><span class="number">2</span>
            <span class="keyword">if</span> (<span class="operator">(</span>nums[i] <span class="operator">&lt;</span> <span class="number">0</span><span class="operator">)</span>:
                <span class="keyword">while</span> (<span class="operator">(</span>nums[i] <span class="operator">&lt;</span> <span class="number">0</span><span class="operator">)</span>:
                    <span class="keyword">if</span> (<span class="operator">(</span>i <span class="operator">!=</span> len(nums)<span class="operator">-</span><span class="number">1</span><span class="operator">)</span>:
                        i <span class="operator">+=</span> <span class="number">1</span>
            <span class="keyword">else</span>:
                <span class="keyword">while</span> (<span class="operator">(</span>nums[i] <span class="operator">&gt;</span> <span class="number">0</span><span class="operator">)</span>:
                    <span class="keyword">if</span> (<span class="operator">(</span>i <span class="operator">!=</span> <span class="number">0</span><span class="operator">)</span>:
                        i <span class="operator">-=</span> <span class="number">1</span>
                i<span class="operator">+=</span><span class="number">1</span>

            left = i<span class="operator">-</span><span class="number">1</span>
            right = i
        
            <span class="keyword">while</span> (<span class="operator">(</span>left <span class="operator">&gt;</span> <span class="operator">-</span><span class="number">1</span> <span class="operator">or</span> right <span class="operator">&lt;</span> len(nums)<span class="operator">)</span>:

                <span class="comment">/* no more left, fill right */</span>
                <span class="keyword">if</span> (<span class="operator">(</span>left <span class="operator">&lt;</span> <span class="number">0</span> <span class="operator">and</span> right <span class="operator">&lt;</span> len(nums)<span class="operator">)</span>:
                    <span class="keyword">while</span> (<span class="operator">(</span>right <span class="operator">&lt;</span> len(nums)<span class="operator">)</span>:
                        squares.append(nums[right]<span class="operator">*</span>nums[right])
                        right <span class="operator">+=</span> <span class="number">1</span>
                
                <span class="comment">/* no more right, fill left */</span>
                <span class="keyword">elif</span> (<span class="operator">(</span>right <span class="operator">&gt;=</span> len(nums) <span class="operator">and</span> left <span class="operator">&gt;=</span> <span class="number">0</span><span class="operator">)</span>:
                    <span class="keyword">while</span> (<span class="operator">(</span>left <span class="operator">&gt;=</span> <span class="number">0</span><span class="operator">)</span>:
                        squares.append(nums[left]<span class="operator">*</span>nums[left])
                        left <span class="operator">-=</span> <span class="number">1</span>

            
                <span class="keyword">elif</span> (<span class="operator">(</span>nums[left]<span class="operator">*</span>nums[left] <span class="operator">&lt;=</span> nums[right]<span class="operator">*</span>nums[right]<span class="operator">)</span>:
                    squares.append(nums[left]<span class="operator">*</span>nums[left])
                    left <span class="operator">-=</span> <span class="number">1</span>
                <span class="keyword">else</span>:
                    squares.append(nums[right]<span class="operator">*</span>nums[right])
                    right <span class="operator">+=</span> <span class="number">1</span>

        <span class="keyword">return</span> squares   
        `,
        1346: `
<span class="keyword">class</span> Solution<span class="operator">(</span><span class="keyword">object</span><span class="operator">):</span>
    <span class="keyword">def</span> checkIfExist<span class="operator">(</span>self, arr<span class="operator">):</span>
        <span class="string">"""</span>
        <span class="string">:type arr: List[int]</span>
        <span class="string">:rtype: bool</span>
        <span class="string">"""</span>
        <span class="keyword">for</span> n <span class="keyword">in</span> <span class="function">range</span><span class="operator">(</span><span class="number">0</span>, <span class="keyword">len</span>(arr)<span class="operator">):</span>
            <span class="keyword">for</span> d <span class="keyword">in</span> <span class="function">range</span> <span class="operator">(</span><span class="number">0</span>, <span class="keyword">len</span>(arr)<span class="operator">):</span>
                <span class="keyword">if</span> d <span class="operator">!=</span> n <span class="keyword">and</span> arr[d] <span class="operator">==</span> arr[n]<span class="operator">*</span><span class="number">2</span><span class="operator">:</span>
                    <span class="function">print</span>(n<span class="operator">*</span><span class="number">2</span>)
                    <span class="keyword">return</span> <span class="keyword">True</span>
        <span class="keyword">return</span> <span class="keyword">False</span>
        `,
        1431: `
<span class="keyword">class</span> <span class="type">Solution</span>(<span class="function">object</span>):
    <span class="keyword">def</span> <span class="function">kidsWithCandies</span>(<span class="variable">self</span>, <span class="variable">candies</span>, <span class="variable">extraCandies</span>):
        <span class="comment">"""
        <span class="comment">:type candies: List[int]</span>
        <span class="comment">:type extraCandies: int</span>
        <span class="comment">:rtype: List[bool]</span>
        """</span>
        <span class="number">max</span> = <span class="number">0</span>
        added = []
        greatest = []
    <span class="keyword">for</span> <span class="type">i</span> <span class="keyword">in</span> <span class="number">range</span>(<span class="number">0</span>, <span class="function">len</span>(candies)):
        <span class="keyword">if</span> (<span class="variable">candies</span>[<span class="variable">i</span>] >= <span class="variable">max</span>):
            <span class="number">max</span> = <span class="white">candies</span>[<span class="variable">i</span>]
            <span class="variable">added</span>.<span class="keyword">append</span>(candies[i] + extraCandies)
    <span class="keyword">for</span> <span class="variable">c</span> <span class="keyword">in</span> <span class="number">range</span>(<span class="number">0</span>, <span class="function">len</span>(candies)):
        <span class="keyword">if</span> (added[c] >= <span class="number">max</span>):
            greatest</span>.append(<span class="keyword">True</span>)
        <span class="keyword">else</span>:
            greatest</span>.append(<span class="keyword">False</span>)
    <span class="keyword">return</span> greatest
    `,
        26: `
<span class="keyword">class</span> Solution<span class="operator">(</span><span class="keyword">object</span><span class="operator">):</span>
    <span class="keyword">def</span> removeDuplicates<span class="operator">(</span>self, nums<span class="operator">):</span>
        <span class="string">"""</span>
        <span class="string">:type nums: List[int]</span>
        <span class="string">:rtype: int</span>
        <span class="string">"""</span>
        
        seen <span class="operator">=</span> <span class="number">[]</span>
        p1_index <span class="operator">=</span> <span class="number">0</span>
        dupFound <span class="operator">=</span> <span class="keyword">False</span>
        
        seen.append(nums[<span class="number">0</span>])
        
        i <span class="operator">=</span> <span class="number">1</span>
        <span class="comment"># iterate through array</span>
        <span class="keyword">while</span> <span class="operator">(</span>i <span class="operator">&lt;</span> <span class="keyword">len</span>(nums)<span class="operator">):</span>                
            <span class="comment"># skip over duplicates</span>
            <span class="keyword">while</span> <span class="operator">(</span>nums[i] <span class="keyword">in</span> seen<span class="operator">):</span>
                dupFound <span class="operator">=</span> <span class="keyword">True</span>
                i <span class="operator">+=</span> <span class="number">1</span>
                <span class="keyword">if</span> <span class="operator">(</span>i <span class="operator">&gt;=</span> <span class="keyword">len</span>(nums)<span class="operator">):</span>
                    <span class="keyword">break</span>
            <span class="keyword">if</span> <span class="operator">(</span>i <span class="operator">&gt;=</span> <span class="keyword">len</span>(nums)<span class="operator">):</span>
                <span class="keyword">break</span>
            <span class="keyword">if</span> <span class="operator">(</span>dupFound<span class="operator">):</span>
                <span class="comment"># move p1 forward</span>
                p1_index <span class="operator">+=</span> <span class="number">1</span>
                <span class="comment"># swap unique with duplicate</span>
                temp <span class="operator">=</span> nums[p1_index]
                nums[p1_index] <span class="operator">=</span> nums[i]
                nums[i] <span class="operator">=</span> temp
                <span class="keyword">if</span> <span class="operator">(</span>nums[p1_index] <span class="keyword">not</span> <span class="keyword">in</span> seen<span class="operator">):</span>
                    seen.append(nums[p1_index])
            <span class="keyword">else</span><span class="operator">:</span> <span class="comment"># no dupes, move both pointers forward</span>
                seen.append(nums[i])
                i <span class="operator">+=</span> <span class="number">1</span>
                p1_index <span class="operator">+=</span> <span class="number">1</span>
            dupFound <span class="operator">=</span> <span class="keyword">False</span>  <span class="comment"># reset dupe marker</span>
        <span class="keyword">return</span> <span class="keyword">len</span>(seen)
    `,
        27: `
<span class="keyword">class</span> Solution<span class="operator">(</span><span class="keyword">object</span><span class="operator">):</span>
    <span class="function">def</span> removeElement<span class="operator">(</span>self, nums, val<span class="operator">):</span>
        <span class="comment">"""
        :type nums: List[int]
        :type val: int
        :rtype: int
        """</span>
        i = <span class="number">len</span><span class="operator">(</span>nums<span class="operator">)</span> - <span class="number">1</span>
        <span class="keyword">while</span> <span class="operator">(</span>i >= <span class="number">0</span><span class="operator">):</span>
            <span class="keyword">if</span> <span class="operator">(</span>nums<span class="operator">[</span>i<span class="operator">]</span> != val<span class="operator">):</span>
                i -= <span class="number">1</span>
                <span class="keyword">continue</span>
            <span class="keyword">else</span><span class="operator">:</span>
                j = i
                k = i + <span class="number">1</span>
                <span class="keyword">while</span> <span class="operator">(</span>k <= <span class="number">len</span><span class="operator">(</span>nums<span class="operator">)</span> - <span class="number">1</span> <span class="keyword">and</span> nums<span class="operator">[</span>k<span class="operator">]</span> != val<span class="operator">):</span>
                    nums<span class="operator">[</span>j<span class="operator">]</span> = nums<span class="operator">[</span>k<span class="operator">]</span>
                    nums<span class="operator">[</span>k<span class="operator">]</span> = val
                    j += <span class="number">1</span>
                    k += <span class="number">1</span>
                i -= <span class="number">1</span>
        count = <span class="number">0</span>
        <span class="keyword">for</span> n <span class="keyword">in</span> nums<span class="operator">:</span>
            <span class="keyword">if</span> <span class="operator">(</span>n != val<span class="operator">):</span>
                count += <span class="number">1</span>
        <span class="keyword">return</span> count
            `,
    }

    let typingSpeed = 30;

    document.getElementById('unlock-code').addEventListener('click', function () {
        var container = document.querySelector('.image-container');

        container.classList.add('fade-out');

        setTimeout(function () {
            container.style.display = 'none';


            typeWriterEffect('typing-text', codeSegments[targetNumber], typingSpeed);
        }, 700);

    });


    function scrollLeft() {
        clearInterval(scrollInterval);
        scrollSpeed = 1;
        scrollInterval = setInterval(() => {
            if (scrollContainer.scrollLeft > 0) {
                scrollContainer.scrollLeft -= scrollSpeed;
                if (scrollSpeed < maxSpeed) {
                    increaseSpeed();
                }
            } else {
                stopScroll();
            }
        }, 50);
    }

    function scrollRight() {
        clearInterval(scrollInterval);
        scrollSpeed = 1;
        scrollInterval = setInterval(() => {
            if (scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                scrollContainer.scrollLeft += scrollSpeed;
                if (scrollSpeed < maxSpeed) {
                    increaseSpeed();
                }
            } else {
                stopScroll();
            }
        }, 50);
    }

    function stopScroll() {
        console.log('stopScroll triggered');
        clearInterval(scrollInterval);
    }

    function increaseSpeed() {
        scrollSpeed += 1;
        if (scrollSpeed > maxSpeed) {
            scrollSpeed = maxSpeed;
        }
    }


    document.getElementById('goLeft').addEventListener('mousedown', scrollLeft);
    document.getElementById('goRight').addEventListener('mousedown', scrollRight);
    document.addEventListener('mouseup', stopScroll);
    document.getElementById('goLeft').addEventListener('mouseleave', stopScroll);
    document.getElementById('goRight').addEventListener('mouseleave', stopScroll);
});

document.addEventListener("DOMContentLoaded", function () {
    let targetNumber = document.getElementById('target-number').value;
});



