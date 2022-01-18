//!CourseApp

//*Course constructor
function Course(title,instructor,image){
    if(!(this instanceof Course)){
        return new Course(title,instructor,image);
    }
    this.title = title;
    this.instructor = instructor;
    this.image = image 
}



//*UI construcor
function UI(){

}


UI.prototype.addCourToList = function(course){
    const list = document.getElementById('course-list')

    var html = `
    <tr>
        <td><img src="${course.image}"></td>
        <td>${course.instructor}</td>
        <td>${course.image}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</td>
    </tr>
    `

    list.innerHTML += html 
}


UI.prototype.deleteCourse = function(deletecourse){
    if(deletecourse.classList.contains('delete')){ 
        deletecourse.parentElement.parentElement.remove()
    }
}


UI.prototype.clearControls = function(){
    const title = document.getElementById('title').value=""
    const instructor = document.getElementById('instructor').value=""
    const image = document.getElementById('image').value = ""
}


UI.prototype.showAlert = function(message,className){
    var messagetext = `<div class="alert alert-${className}">
        ${message}
    </div>`

    const row = document.querySelector('.row')
    row.insertAdjacentHTML("beforebegin",messagetext)

    setTimeout(function(){
        document.querySelector('.alert').remove()
    },3000)

}



document.getElementById('new-course').addEventListener('submit',function(e){
    const title = document.getElementById('title').value
    const instructor = document.getElementById('instructor').value
    const image = document.getElementById('image').value

    //*Create course object
    const course = new Course(title,instructor,image)


    //*UI 
    const ui = new UI();

    if(title === '' || instructor === '' || image === ''){
        ui.showAlert('Please complete the form','warning')
    }
    else{//if no error
        //*add course to list
        ui.addCourToList(course)

        //*clear controls
        ui.clearControls()

        ui.showAlert('The coruse has been added','success')
    }

    e.preventDefault()//stop send data from form
})


document.getElementById('course-list').addEventListener('click',function(e) {
    const ui = new UI();
    ui.deleteCourse(e.target)
    ui.showAlert('The course has been deleted','danger')
})