const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const resultsTag = document.querySelector("section.results")

const accessKey = config.accessKey
// if you're working off this github repo, you'll need to use your own Unsplash access key like so:
// const accessKey = "1234abcdexample"
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query="

const searchUnsplash = function (term) {
    return fetch(apiUrl + term, {
            method: "GET",
            headers: {
                "Authorization": "Client-ID " + accessKey
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)

                // format Unsplash results to suit our needs 
                return data.results.map(result => {
                    return {
                        imageSrc: result.urls.regular,
                        width: result.width,
                        height: result.height,  
                        name: result.user.name,
                        title: (result.description || "Untitled"),   
                        backgroundColor: (result.color || "#cccccc") + "33"
                    }
                })
            })
}

// add results to the page

const addResults = function(results) { 
    // remove all the loading tags

    resultsTag.innerHTML = ""

    // loop over each individual result and add to the results tag
    results.forEach(result => {
        resultsTag.innerHTML = resultsTag.innerHTML + `
            <div class="single-result">
                <div class="image" style="background-color: ${result.backgroundColor}">
                    <img src="${result.imageSrc}">
                </div>
                <h2>image of ${result.title}</h2>
                <p>by ${result.name} - ${result.width} x ${result.height}</p>
            </div>
        `
    })
}

// when we submit the form, get the info from input

formTag.addEventListener("submit", function(event) {
    
    // get the info from input
    const searchTerm = inputTag.value

    searchUnsplash(searchTerm)
        .then(results => {
           addResults(results) 
        })
    
    // stop the form from going to the usual next page
    event.preventDefault()
})