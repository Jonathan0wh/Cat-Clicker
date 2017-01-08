let model = {

    cats: [
        {
            id: "cat1",
            name: "Cat 1",
            imgSrc: "images/cat1.jpg",
            clickCount: 0
        },
        {
            id: "cat2",
            name: "Cat 2",
            imgSrc: "images/cat2.jpg",
            clickCount: 0
        },
        {
            id: "cat3",
            name: "Cat 3",
            imgSrc: "images/cat3.jpg",
            clickCount: 0
        },
        {
            id: "cat4",
            name: "Cat 4",
            imgSrc: "images/cat4.jpg",
            clickCount: 0
        },
        {
            id: "cat5",
            name: "Cat 5",
            imgSrc: "images/cat5.jpg",
            clickCount: 0
        }
    ],

    getCats: function () {
        return this.cats;
    },

    getCatIndexByName: function (catName) {
        return this.cats.findIndex((item) => item.name === catName);
    },

    getCatByIndex: function (catIndex) {
        return model.getCats()[catIndex];
    },

    setCatByIndex: function (catIndex, selectedCatName, newCatImg, newCatCount) {
        Object.assign(this.cats[catIndex],
            {
                name: selectedCatName,
                imgSrc: newCatImg,
                clickCount: newCatCount
            });
    }
};


let controller = {

    init: function () {
        navView.init();
        tabView.init();
        buttonView.init();
        formView.init();
    },

    getCats: function () {
        return model.getCats();
    },

    saveData: function (selectedCatName, newCatImg, newCatCount) {
        let selectedCatIndex = model.getCatIndexByName(selectedCatName);
        model.setCatByIndex(selectedCatIndex, selectedCatName, newCatImg, newCatCount);
        tabView.renderTab(selectedCatIndex);
    }
};


let navView = {

    init: function () {
        let navItemModelStr = $("#nav-item-template").html();

        controller.getCats().forEach(function (cat, index) {
            let navItem = navItemModelStr.replace(/%catID%/g, cat.id).replace(/%catName%/g, cat.name);
            let navItemHTML;
            if (index === 0) {
                navItemHTML = navItem.replace(/%active%/g, "active");
            } else {
                navItemHTML = navItem.replace(/%active%/g, "");
            }
            $(".cat-nav").append(navItemHTML);
        });
    }
}


let tabView = {

    init: function () {
        let tabPaneModelStr = $("#tab-pane-template").html();

        $(".cat-tab").empty();

        controller.getCats().forEach(function (cat, index) {
            let tabPane = tabPaneModelStr.replace(/%catID%/g, cat.id).replace(/%catName%/g, cat.name).replace(/%catImg%/g, cat.imgSrc);
            let tabPaneHTML;
            if (index === 0) {
                tabPaneHTML = tabPane.replace(/%active%/g, "active");
            } else {
                tabPaneHTML = tabPane.replace(/%active%/g, "");
            }
            $(".cat-tab").append(tabPaneHTML);

            // add listener and event
            let selectImg = "#" + cat.id + "-img";
            let selectCount = "#" + cat.id + "-count";
            $(selectImg).click(function () {
                cat.clickCount++;
                $(selectCount).text(cat.clickCount);
            });
        });
    },

    renderTab: function (selectedCatIndex) {
        let cat = model.getCatByIndex(selectedCatIndex);
        let selectedCatID = "#" + cat.id;
        $(selectedCatID + ">h2").text(cat.name);
        $(selectedCatID + ">img").attr("src", cat.imgSrc);
        $(selectedCatID + " strong").text(cat.clickCount);
    }
}

let buttonView = {

    init: function () {
        $("#admin-button").click(function () {
            formView.toggleVisibility();
        });
    }
}

let formView = {

    init: function () {
        $("#input-form").addClass("invisible");
        $("#cancel-button").click(function () {
            formView.hide();
        });
        $("#save-button").click(function () {
            let selectedCat = $("#cat-name-change").val();
            let newCatImg = $("#cat-img-change").val();
            let newCatCount = $("#cat-count-change").val();

            controller.saveData(selectedCat, newCatImg, newCatCount);

            formView.hide();
            $("#cat-name-change").val("");
            $("#cat-img-change").val("");
            $("#cat-count-change").val("");

            let alert = `<div class="alert alert-success" role="alert">
                            <strong class="text-md-center">Well done!</strong> You successfully changed a cat.
                        </div>`;
            $("main").append(alert);
            $(".alert").alert();
            window.setTimeout(function () { $(".alert").alert('close'); }, 2000);
        });
    },

    toggleVisibility: function () {
        $("#input-form").toggleClass("invisible");
    },

    show: function () {
        $("#input-form").removeClass("invisible");
    },

    hide: function () {
        $("#input-form").addClass("invisible");
    }
}

controller.init();
