const nums = [1, 2, 3, 4, 5];
const navItemModelStr = $("#nav-item-template").html();
const tabPaneModelStr = $("#tab-pane-template").html();

nums.forEach(function (value) {
    let catName = "Cat " + value;
    let catID = "cat" + value;
    let catImg = "cat" + value;
    let count = 0;

    // render model
    let navItem = navItemModelStr.replace(/%catID%/g, catID).replace(/%catName%/g, catName);
    let tabPane = tabPaneModelStr.replace(/%catID%/g, catID).replace(/%catName%/g, catName).replace(/%catImg%/g, catImg);

    let navItemHTML;
    let tabPaneHTML;

    if (value === 1) {
        navItemHTML = navItem.replace(/%active%/g, "active");
        tabPaneHTML = tabPane.replace(/%active%/g, "active");
    } else {
        navItemHTML = navItem.replace(/%active%/g, "");
        tabPaneHTML = tabPane.replace(/%active%/g, "");
    }

    $(".cat-nav").append(navItemHTML);
    $(".cat-tab").append(tabPaneHTML);

    // add listener and event
    let selectImg = "#" + catID + "-img";
    let selectCount = "#" + catID + "-count";
    $(selectImg).click(function () {
        count++;
        $(selectCount).text(count);
    });
});
