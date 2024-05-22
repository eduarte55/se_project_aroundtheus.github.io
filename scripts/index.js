const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*------------------------------------------------------------*/
/*                          Elements                          */
/*------------------------------------------------------------*/

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = document.querySelector(
  "#profileModal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");

const cardListEl = document.querySelector(".elements__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddModal = document.querySelector("#cardAddModal");
const cardAddForm = cardAddModal.querySelector("#add-card-form");
const addNewCardBtn = document.querySelector(".profile__add-button");
const cardModalCloseBtn = cardAddModal.querySelector("#addModal_close-button");
const cardTitleInput = cardAddModal.querySelector("#card-title-input");
const cardUrlInput = cardAddModal.querySelector("#card-url-input");

const reviewPictureModal = document.querySelector("#reviewPictureModal");
const reviewPictureCloseBtn =
  reviewPictureModal.querySelector("#picture_close-btn");
const reviewPictureModalImage =
  reviewPictureModal.querySelector(".modal__picture");
const reviewPictureCaption = reviewPictureModal.querySelector(
  ".modal__sub-heading"
);

/*------------------------------------------------------------*/
/*                        Functions                           */
/*------------------------------------------------------------*/

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", (evt) => {
    openModal(reviewPictureModal);
    reviewPictureCaption.textContent = evt.target.alt;
    reviewPictureModalImage.src = evt.target.src;
    reviewPictureModalImage.alt = evt.target.alt;
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);

  return cardElement;
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openModal(profileEditModal);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const cardData = { link: cardUrlInput.value, name: cardTitleInput.value };
  cardListEl.prepend(getCardElement(cardData));
  closeModal(cardAddModal);
  cardAddForm.reset();
}

function handleReviewPictureClose() {
  closeModal(reviewPictureModal);
}

function handleCardModalClose() {
  closeModal(cardAddModal);
}

/*------------------------------------------------------------*/
/*                      Event Listeners                       */
/*------------------------------------------------------------*/

profileEditButton.addEventListener("click", openEditProfileModal);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addNewCardBtn.addEventListener("click", () => openModal(cardAddModal));
cardModalCloseBtn.addEventListener("click", handleCardModalClose);
cardAddForm.addEventListener("submit", handleCardAddSubmit);

reviewPictureCloseBtn.addEventListener("click", handleReviewPictureClose);

/*------------------------------------------------------------*/
/*                      Initial Setup                         */
/*------------------------------------------------------------*/

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});
