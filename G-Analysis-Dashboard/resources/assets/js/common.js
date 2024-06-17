$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$(document).on('click','.active_side_bar', function (){
    let textContent = $.trim($(this).find('p').text());
    localStorage.setItem('active',textContent);
});

$(document).on('click','.product-logout', function (){
    $.ajax({
        type: "GET",
        url: "dashboard-logout",
        success:function(result) {
            if(result.code == 200) {
                toastr.success("Logged Out Successfully.");
                window.location.href = "https://g-analysis.com/";
            }
        },
        error:function(result) {
            toastr.error(result);
        }
    });
});

if (localStorage.getItem('active')){
    const sideBarLi = document.getElementsByClassName('active_side_bar');
    const activeLi = localStorage.getItem('active');
    for (const sideBarLiElement of sideBarLi) {
        let activeInactiveElement = sideBarLiElement.querySelector('a');
        let text = sideBarLiElement.querySelector('a p').innerText;
        if(activeLi === text) {
            activeInactiveElement.classList.add('active');
        } else {
            activeInactiveElement.classList.remove('active');
        }
    }
}

const databaseHandler = document.getElementById('database-handler');
const databaseHandlerFunction = () => {
    const changeDataBaseHook = new Promise(function(resolve, reject) {
    const database = databaseHandler.options[databaseHandler.selectedIndex].value;
    $.ajax({
            url:'/switch-database',
            type: 'POST',
            data: {
                database:database
            },
        }).done( function(data) {
            if(data['code'] == 200) {
                return resolve(data);
            } else {
                return reject(data);
            }
        })
    });

    changeDataBaseHook.then(
        function(result) {
            location.reload();
        },
        function(error) {
            console.log('DatabaseError',error);
        }
    );
}
//databaseHandler.addEventListener('change',databaseHandlerFunction);
