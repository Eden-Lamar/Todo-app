const todoID = "todo";
const searchID = "search";
const listContainerID = "list-container";
const formID = "form";

const todoInput = document.getElementById(todoID);
const searchInput = document.getElementById(searchID);
const listContainer = document.getElementById(listContainerID);
const form = document.getElementById(formID);

const createList = (list, completed = "", dim = "") => {
	listContainer.insertAdjacentHTML(
		"beforeend",
		`
			<div class="join-ms animate__animated" id=${list.id}>
			<li class= ${dim}>
			<p class=${completed}>${list.text}</p>
			</li>
			<div class="btn-group join-ms2">
			<span>
			<button class="btn btn-green" onclick="checkList(event)" role="button"><i class="fas fa-check"></i></button>
				</span>
				<span>
					<button class="btn btn-red" onclick="removeList(event)" role="button"><i class="far fa-trash-alt"></i></button>
					</span>
			</div>
			</div>
		`
	);
};

const persistDataAndUpdateUI = (...args) => {
	// console.log(args);
	localStorage.setItem("list", JSON.stringify(args));
	todoInput.value = "";
	const lists = JSON.parse(localStorage.getItem("list"));
	const todoItem = lists[lists.length - 1];
	createList(todoItem);
	todoInput.setAttribute("placeholder", "My Todo...");
	todoInput.classList.remove("error-message");
	// console.log(lists);
};

// let lists = [
// 	{ id: 1, text: "Get Milk" },
// 	{ id: 2, text: "Get eggs" },
// 	{ id: 3, text: "Eat" },
// ];

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const id = Math.floor(Math.random() * 2000);
	const text = todoInput.value.trim();
	const getList = JSON.parse(localStorage.getItem("list"));

	if (text.length) {
		if (getList !== null) {
			const pushedList = JSON.parse(localStorage.getItem("list"));
			const listItem = { id, text, completed: false };
			persistDataAndUpdateUI(...pushedList, listItem);
		} else {
			const listItem = { id, text, completed: false };
			persistDataAndUpdateUI(listItem);
		}
	} else {
		todoInput.setAttribute("placeholder", "Please Fill Out This Field...");
		todoInput.classList.add("error-message");
	}
});

const removeList = (e) => {
	const parentElement = e.currentTarget.parentNode.parentNode.parentNode;

	parentElement.classList.add("animate__backOutDown");
	setTimeout(() => {
		parentElement.remove();
	}, 350);
	const getList = JSON.parse(localStorage.getItem("list"));

	const filteredList = getList.filter((item) => item.id !== Number(parentElement.getAttribute("id")));
	localStorage.setItem("list", JSON.stringify([...filteredList]));
	JSON.parse(localStorage.getItem("list"));
};

const checkList = (e) => {
	const parentElement = e.currentTarget.parentNode.parentNode.parentNode;
	const textElement = parentElement.firstElementChild.firstElementChild;
	const checked = parentElement.getAttribute("id");

	const getList = JSON.parse(localStorage.getItem("list"));
	const filteredList = getList.filter((item) => item.id === Number(checked));

	if (filteredList[0].completed) {
		const index = getList.indexOf(filteredList[0]);
		getList[index].completed = false;
		localStorage.setItem("list", JSON.stringify(getList));
		textElement.classList.remove("completed");
		parentElement.firstElementChild.classList.remove("dim");
	} else {
		const index = getList.indexOf(filteredList[0]);
		getList[index].completed = true;
		localStorage.setItem("list", JSON.stringify(getList));
		textElement.classList.add("completed");
		parentElement.firstElementChild.classList.add("dim");
	}
	// console.log(filteredList);
	// console.log(textElement);
};

const searchTodo = () => {
	document.getElementById("search-form").addEventListener("submit", (e) => e.preventDefault());
	searchInput.addEventListener("input", (e) => {
		const getList = JSON.parse(localStorage.getItem("list"));
		const searchFilter = getList.filter((item) =>
			item.text.toLowerCase().includes(e.target.value.trim().toLowerCase())
		);
		listContainer.innerHTML = "";
		searchFilter.forEach((list) => {
			if (list.completed) {
				createList(list, "completed", "dim");
			} else {
				createList(list, "", "");
			}
		});
		// console.log(e.target.value);
		// console.log(searchFilter);
	});
};

searchTodo();

const getList = JSON.parse(localStorage.getItem("list"));
// console.log(getList);
if (getList !== null) {
	getList.forEach((list) => {
		if (list.completed) {
			createList(list, "completed", "dim");
		} else {
			createList(list, "", "");
		}
	});
} else {
	console.log(`Am batman`);
}
