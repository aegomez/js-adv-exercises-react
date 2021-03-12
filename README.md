# js-adv-exercises-react

JavaScript Advanced Exercises - Part 3

[Exercises 1-7 (Promises, Algorithms)](https://github.com/aegomez/js-adv-exercises)

[Exercises 8-36 (JS, NodeJS, HTML/CSS)](https://github.com/aegomez/js-adv-exercises-2)

## ReactJS

41. Create a component that can populate a line chart with data retrieved from a customizable data source. 
    - Should be able to display up to 100 data points.
    - Periodically update the component with new data.
    - Make use of saga channels to  subscribe to a data source stream. 

42. Create a gallery component that can display multiple pages of image data.
    - Data is retrieved through ajax calls `/gallery/:galleryID/?count=10&page=1`
    - Scrolling to the end of a page should trigger a call to retrieve the next page’s data. The next page should only be displayed if the user clicks on the page number or a **next** button. 
    - The JSON result will have a schema of:
    ```js
    Page = {
      "id": String,
      "images": Image[],
      "page": Number,
      "total": Number,
    }

    Image = {
      "src": URLString,
      "width": Number,
      "height": Number,
    }
    ```
    - If an image’s dimensions are proportional, the image should display in a single cell. If an image’s width is twice as large or greater than its height then it should span two columns. If an image’s height is twice as large as the width then it should span two rows. 


## Author

Adrian Gomez

## License

MIT