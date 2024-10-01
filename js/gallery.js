var gallery = document.querySelector('#gallery');
var getVal = function (elem, style) {
    return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
};
var getHeight = function (item) {
    return item.querySelector('.content').getBoundingClientRect().height;
};
var resizeAll = function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        var el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
};

var handleImageLoad = function (item) {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    var gitem = item.parentElement.parentElement;
    gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
    item.classList.remove('byebye');
};

gallery.querySelectorAll('img').forEach(function (item) {
    item.classList.add('byebye');

    // Kiểm tra nếu ảnh đã tải xong trước đó
    if (item.complete) {
        handleImageLoad(item); // Xử lý ngay nếu ảnh đã tải xong
    } else {
        item.addEventListener('load', function () {
            handleImageLoad(item); // Xử lý sau khi ảnh tải xong
        });
        item.addEventListener('error', function () {
            // Xử lý khi có lỗi tải ảnh (nếu cần)
            console.error('Error loading image: ' + item.src);
        });
    }
});

// Đảm bảo gọi resizeAll() khi tất cả ảnh đều đã tải xong
window.addEventListener('load', resizeAll);


//-------------sắp xếp kiểu 1----------------------
var gallery = document.querySelector('#gallery');
var images = Array.from(gallery.querySelectorAll('.gallery-item'));

// Hàm để hoán đổi vị trí các ảnh ngẫu nhiên
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hoán đổi vị trí ảnh trong DOM
function randomizeGallery() {
    let shuffledImages = shuffle(images);
    shuffledImages.forEach(function(item) {
        gallery.appendChild(item); // Thêm lại ảnh vào gallery theo thứ tự mới
    });
}

// Gọi hàm ngẫu nhiên hóa khi trang được tải
window.addEventListener('load', function() {
    randomizeGallery();
    resizeAll(); // Gọi lại resizeAll để điều chỉnh lưới sau khi sắp xếp lại
});
///------sắp xếp kiểu 2
function randomizeGrid() {
    let columnOptions = ['1fr 1fr', '1fr 1fr 1fr', '1fr 2fr 1fr', '0.5fr 1fr 0.5fr 0.5fr 1fr 0.7fr']; // Các lựa chọn về số cột
    let rowGapOptions = ['5px','10px', '20px', '30px']; // Các lựa chọn về khoảng cách giữa các hàng

    let randomColumns = columnOptions[Math.floor(Math.random() * columnOptions.length)];
    let randomRowGap = rowGapOptions[Math.floor(Math.random() * rowGapOptions.length)];

    gallery.style.gridTemplateColumns = randomColumns;
    gallery.style.gridRowGap = randomRowGap;
}

// Gọi hàm ngẫu nhiên hóa lưới khi trang được tải
window.addEventListener('load', function() {
    randomizeGrid();
    resizeAll(); // Gọi lại resizeAll để điều chỉnh lưới sau khi thay đổi cấu hình
});

///-kết hợp 2 cách sắp xếp ảnh
window.addEventListener('load', function() {
    randomizeGallery();
    randomizeGrid();
    resizeAll(); // Gọi lại resizeAll để điều chỉnh lưới sau khi thay đổi
});
