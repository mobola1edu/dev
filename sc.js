    document.addEventListener('DOMContentLoaded', function() {
        var apiKeyInput = document.querySelector('input[name="apikey"]');
        var wordInput = document.querySelector('input[name="word"]');
        var blacklistCheckbox = document.getElementById('blacklistCheckbox');
        var searchButton = document.getElementById('searchButton');

        function checkInputs() {
            if (apiKeyInput.value && wordInput.value) {
                searchButton.disabled = false;
            } else {
                searchButton.disabled = true;
            }
        }

        apiKeyInput.addEventListener('input', checkInputs);
        wordInput.addEventListener('input', checkInputs);

        searchButton.addEventListener('click', function(event) {
            event.preventDefault();
            searchButton.disabled = true;
            apiKeyInput.disabled = true;
            wordInput.disabled = true;
            searchButton.innerText = "Loading";
            searchButton.classList.add('loading');

            setTimeout(function() {
                var searchForm = document.getElementById('searchForm');
                searchForm.action = "https://api.topchek.dev/";

                var apiKeyParam = document.createElement('input');
                apiKeyParam.type = "hidden";
                apiKeyParam.name = "apikey";
                apiKeyParam.value = apiKeyInput.value;
                searchForm.appendChild(apiKeyParam);

                var wordParam = document.createElement('input');
                wordParam.type = "hidden";
                wordParam.name = "word";
                wordParam.value = wordInput.value;
                searchForm.appendChild(wordParam);

                if (blacklistCheckbox.checked) {
                  var blacklistParam = document.createElement('input');
                  blacklistParam.type = "hidden";
                  blacklistParam.name = "blacklist";
                  blacklistParam.value = "1";
                  searchForm.appendChild(blacklistParam);
                } 
                else {
                  var blacklistParam = document.createElement('input');
                  blacklistParam.type = "hidden";
                  blacklistParam.name = "blacklist";
                  blacklistParam.value = "0";
                  searchForm.appendChild(blacklistParam);
                }
                searchForm.submit();
            }, 1000);
        });

        checkInputs();
    });


  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("linesValue").textContent = this.responseText;
    }
  };

  xhttp.open("GET", "lines.txt", true);
  xhttp.send();


fetch('https://topchek.dev/lines.txt')
        .then(response => response.text())
        .then(lines => {
          const linesValue = document.getElementById('linesValue');
          const targetValue = parseInt(lines.trim(), 10);
          const animationDuration = 10000;
          const updateInterval = 50;
          let currentValue = 0;
          const step = (targetValue - currentValue) / (animationDuration / updateInterval);

          const animate = () => {
            currentValue += step;
            linesValue.textContent = Math.round(currentValue);
            if (currentValue < targetValue) {
              requestAnimationFrame(animate);
            } else {
              linesValue.textContent = targetValue;
            }
          };

          animate();
        });