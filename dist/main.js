const fetchData = function(){
    let input = $("#team").val()

    const renderer = function(data){
        const source = $("#players-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({data})
        $("#players").append(newHTML)
    }


    $.get(`/teams/${input}`, function(itemData){
            renderer(itemData)
    })
}

