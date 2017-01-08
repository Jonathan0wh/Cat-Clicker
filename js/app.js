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
    }
};


let controller = {
    init: function () {
        navView.init();
        tabView.init();
    },
    getCats: function () {
        return model.getCats();
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
    }
}

controller.init();
