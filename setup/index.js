fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector(".cards_container");

    const cardsPerPage = 4;
    let currentPage = 1;
    let totalCards = data.length;
    let filteredData = data;
    var totalPages = Math.ceil(totalCards / cardsPerPage);

    function displayCards(page) {
      const startIndex = (page - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;


      for (let i = startIndex; i < endIndex && i < filteredData.length; i++) {
        const card = document.createElement("div");
        const date = new Date(filteredData[i].date);
        const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        card.className = "card";
        card.innerHTML = `
          <div class="header_card">
            <div class="card_profile_img"><img src=${filteredData[i].profile_image} alt="profile_img" /></div>
            <div class="card_title">
              <h3>${filteredData[i].name}</h2>
              <span class="date">${formattedDate}</span>
            </div>
            <div class="source_type_img">
              <img src="../icons/${filteredData[i].source_type}.svg" alt="source_type">
            </div>
          </div>
          <div class="card_img-content">
            <img src=${filteredData[i].image} alt="source_type">
            <p>${filteredData[i].caption.substring(0, 150)}
            ${filteredData[i].caption.length > 100 ? '... <span class="card_caption_more">more</span>' : ""}</p>
          </div>
          <div><hr /></div>
          <div>
          <div class="card_likes">
          <svg class="like-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="count_likes">${filteredData[i].likes}</span>
          </div>
          </div>
          `;

        container.appendChild(card);


        function modal(data) {
          const cards = document.querySelectorAll('.card');
          cards.forEach((card, i) => {
            const img = card.querySelector('.card_img-content');
            img.addEventListener("click", () => {
              const modal = document.getElementById("myModal");
              const modalContent = modal.querySelector(".modal-content");
              var span = document.getElementsByClassName("close")[0];
              modalContent.innerHTML = `
      <div class="header_card">
        <!-- Add card header content here -->
      </div>
      <div class="modal_left card_img-content">
        <img src=${data[i].image} alt="source_type">
      </div>
      <div class="modal_right">
        <div class="header_card">
        <div class="card_profile_img"><img src=${data[i].profile_image} alt="profile_img" /></div>
        <div class="card_title">
        <h3>${data[i].name}</h2>
        <span class="date">${formattedDate}</span>
        </div>
        <div class="source_type_img">
        <img src="../icons/${data[i].source_type}.svg" alt="source_type">
        </div>
        <span class="close">X</span>
          </div>
          <div class="modal_hr_line"><hr /></div>
        <div class="modal_content">
          <p>${data[i].caption}
        </div>
        <div>
          <div class="card_likes"><img src="../icons/heart.svg" alt="source_type" class="like-icon">
            <span class="count_likes">${data[i].likes}</span>
          </div>
        </div>
        <div>
          <div class="card_likes">
            <!-- Add card likes content here -->
          </div>
        </div>
      </div>
    `;
              if (window.innerWidth > 767) {
                modal.style.display = "flex";
              }

              window.onclick = function (event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
              };
              const closeModalButton = modal.querySelector(".close");
              closeModalButton.addEventListener("click", () => {
                modal.style.display = "none";
              });
            });
          });
        }
        modal(data)

        const heartEl = card.querySelector('.like-icon');
        heartEl.addEventListener('click', () => {
          console.log("raboteeeeeeee");
          const likesEl = card.querySelector('.count_likes');
          let currentLikes = parseInt(likesEl.textContent);
          if (heartEl.classList.contains('liked')) {
            currentLikes--;
            heartEl.classList.remove('liked');
          } else {
            currentLikes++;
            heartEl.classList.add('liked');
          }
          likesEl.textContent = currentLikes;
        });
      }
    }


    function addClassNameToCards(val) {
      const allCards = document.querySelectorAll(".card");
      allCards.forEach(card => {
        card.className = `card cardColumns${val}`;
      });
    }

    const numberColumns = document.getElementById("numberOfColumns");
    numberColumns.addEventListener("change", () => {
      const val = numberColumns.value;
      addClassNameToCards(val);
      container.classList = "cards_container cards_container_Columns" + val;
    });

    function changeBackgroundColor() {
      const allCards = document.querySelectorAll(".card");
      const newColor = colorInput.value;
      allCards.forEach(card => {
        card.style.backgroundColor = newColor;
        card.style.color = "white";
      });
    }
    const colorInput = document.getElementById("cardBackgroundColor");
    colorInput.addEventListener("input", changeBackgroundColor);

    const cardSpaceBetween = document.getElementById("cardSpaceBetween");
    function changeSpaceBetweenCards() {
      const space = cardSpaceBetween.value;
      container.style.gap = space;
    }
    cardSpaceBetween.addEventListener("input", changeSpaceBetweenCards)


    function changeTheme() {
      const selectedRadio = radioGroup.querySelector("input:checked");
      const themeValue = selectedRadio.value;
      const allCards = document.querySelectorAll(".card")
      allCards.forEach(card => {
        if (themeValue == "darkTheme") {
          card.style.color = "white";
          card.style.backgroundColor = "black";
          document.getElementById("cardBackgroundColor").value = "#000000"
        } else {
          card.style.color = "black";
          card.style.backgroundColor = "white";
          document.getElementById("cardBackgroundColor").value = "#ffffff"
        }
      })
    }
    const radioGroup = document.querySelector(".radio-group");
    radioGroup.addEventListener("change", changeTheme);


    function filterData() {
      const selectedRadio = radioGroup2.querySelector("input:checked");
      const themeValue = selectedRadio.value;
      if (themeValue === "all") {
        filteredData = data;
      } else {
        filteredData = data.filter(obj => obj.source_type === themeValue);
      }
      console.log(filteredData);
      container.innerHTML = "";
      totalCards = filteredData.length;
      totalPages = Math.ceil(totalCards / cardsPerPage);
      currentPage = 1;
      displayCards(currentPage);
      loadMoreBtn.style.display = "block";
      changeBackgroundColor()
      changeTheme()
      changeSpaceBetweenCards()
      addClassNameToCards(numberColumns.value)
    }
    const radioGroup2 = document.querySelector(".rg2");
    radioGroup2.addEventListener("change", filterData);


    displayCards(currentPage);
    addClassNameToCards(numberColumns.value);
    changeTheme();


    const loadMoreBtn = document.getElementById("loadMoreButton")
    loadMoreBtn.addEventListener("click", loadMore);

    function loadMore() {
      const colorInput = document.getElementById("cardBackgroundColor");

      currentPage++;
      displayCards(currentPage);
      addClassNameToCards(numberColumns.value);
      changeBackgroundColor()

      if (colorInput.value == "#ffffff" || colorInput.value == "#000000") {
        changeTheme();
      }

      if (currentPage >= totalPages) {
        loadMoreBtn.style.display = "none";
      }
    }

    function togglePanel() {
      const accordion = document.querySelector(".accordion");
      const settingsPanel = document.querySelector(".settings");

      accordion.addEventListener('click', function () {
        accordion.classList.toggle('active');
        if (settingsPanel.style.display === 'block') {
          settingsPanel.style.display = 'none';
        } else {
          settingsPanel.style.display = 'block';
        }

      })
    }
    togglePanel();
  });






