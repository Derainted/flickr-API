const input_search = document.querySelector("#search");
const input_size = document.querySelector("#size");
const input_quantity = document.querySelector("#quantity");
const btn = document.querySelector("#button-but");

// Event Listnener
input_search.addEventListener("click", function (event) {
    input_search.value = "";
});

input_size.addEventListener("click", function (event) {
    input_size.value = "";
});

btn.addEventListener("click", function (event) {
    getImage(input_search.value, input_size.value, input_quantity.value);
    removeImage();
});


function getImage(textbox, size, input_quantity) {

    const KEY = "a2a475ef5814a12844ac706a0b2bf970";

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${textbox}
            &format=json&nojsoncallback=1&per_page=${input_quantity}&page=1`;

    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw "Something went wrong";
            }
        }
    ).then(
        function (data) {
            console.log(data);
            getImageUrl(data, size);
        }
    ).catch(
        function (error) {
            console.log(error);
            const p = document.createElement('p');
            p.innerHTML = "Something went wrong with fetching the image. Please try again";
            document.body.appendChild(p);
            setTimeout(function () {
                p.parentNode.removeChild(p);
            }, 3000);
        }
    );
}


function getImageUrl(photoObject, size) {
    let photo = photoObject;
    for (const photo of photoObject.photos.photo) {
        let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
        displayImg(imgUrl);
    }
}

function displayImg(url) {
    let img = document.createElement("img");
    img.src = url;
    document.body.appendChild(img);

}

function removeImage() {
    const imgages = document.querySelectorAll("img");
    for (const img of imgages) {
        img.remove();
    }
}