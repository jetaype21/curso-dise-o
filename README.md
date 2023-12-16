**API CURSOS**

| Ruta                                    | Verbo HTTP | Descripción                                |
| :-------------------------------------- | :--------: | :----------------------------------------- |
| `/api/courses/sampleCourses`            |   `GET`    | Muestra cursos aleatorios                  |
| `/api/courses/getAllCourses`            |   `GET`    | Muestra todos los cursos                   |
| `/api/courses/getTeacherCourses/:id`    |   `GET`    | Muestra todos los cursos del profesor      |
| `/api/courses/getOneCourse/:id`         |   `GET`    | Muestra un curso                           |
| `/api/courses/newCourse`                |   `POST`   | Crea un nuevo curso                        |
| `/api/courses/editCourse/:id`           |   `PUT`    | Edita un curso                             |
| `/api/courses/deleteCourse/:id`         |  `DELETE`  | Elimina un curso                           |
| `/api/courses/deleteTeacherCourses/:id` |  `DELETE`  | Elimina los cursos creados por el profesor |

**API PROFESORES**

| Ruta                              | Verbo HTTP | Descripción                   |
| :-------------------------------- | :--------: | :---------------------------- |
| `/api/teachers/getAllTeachers`    |   `GET`    | Muestra todos los profesores  |
| `/api/teachers/getTheTeacher/:id` |   `GET`    | Muestra detalles del profesor |
| `/api/teachers/getOneTeacher/:id` |   `GET`    | Valida el rol del profesor    |
| `/api/teachers/newTeacher`        |   `POST`   | Crea un nuevo profesor        |
| `/api/teachers/editTeacher/:id`   |   `PUT`    | Edita un profesor             |
| `/api/teachers/deleteTeacher/:id` |  `DELETE`  | Elimina un profesor           |

**API USUARIOS**

| Ruta                                        | Verbo HTTP | Descripción                                            |
| :------------------------------------------ | :--------: | :----------------------------------------------------- |
| `/api/users/getOneUser/:id`                 |   `GET`    | Obtiene detalles del usuario                           |
| `/api/users/editUser/:id`                   |   `PUT`    | Edita un usuario                                       |
| `/api/users/deleteUser/:id`                 |  `DELETE`  | Elimina un usuario                                     |
| `/api/users/userFavCourses/:id`             |   `GET`    | Muestra la lista de cursos favoritos del usuario       |
| `/api/users/userFavTeachers/:id`            |   `GET`    | Muestra la lista de profesores favoritos del usuario   |
| `/api/users/editUser/updateFavCourses/:id`  |   `PUT`    | Actualiza la lista de cursos favoritos del usuario     |
| `/api/users/editUser/updateFavTeachers/:id` |   `PUT`    | Actualiza la lista de profesores favoritos del usuario |

**API COMENTARIOS**

| Ruta                                  | Verbo HTTP | Descripción                   |
| :------------------------------------ | :--------: | :---------------------------- |
| `/api/comments/getCourseComments/:id` |   `GET`    | Obtiene comentarios del curso |
| `/api/comments/newComment`            |   `POST`   | Crea un comentario            |
| `/api/comments/deleteComment/:id`     |  `DELETE`  | Elimina un comentario         |

**API AUTENTICACIÓN**

| Ruta            | Verbo HTTP | Descripción                                |
| :-------------- | :--------: | :----------------------------------------- |
| `/api/login`    |   `POST`   | Gestiona el formulario de inicio de sesión |
| `/api/signup`   |   `POST`   | Gestiona el formulario de registro         |
| `/api/logout`   |   `POST`   | Gestiona el cierre de sesión               |
| `/api/loggedin` |   `GET`    | Gestiona la persistencia de la sesión      |

**API ARCHIVOS**

| Ruta          | Verbo HTTP | Descripción   |
| :------------ | :--------: | :------------ |
| `/api/upload` |   `POST`   | Sube archivos |

**CLIENTE**

| Ruta                                      | Descripción                                            |
| :---------------------------------------- | :----------------------------------------------------- |
| `/`                                       | Página de inicio                                       |
| `/courses`                                | Muestra todos los cursos                               |
| `/courses/:course_id`                     | Muestra un curso                                       |
| `/teachers`                               | Muestra todos los profesores                           |
| `/teachers/:teacher_id`                   | Muestra detalles del profesor                          |
| `/signup`                                 | Muestra el formulario de registro                      |
| `/profile`                                | Muestra el perfil del usuario                          |
| `/profile/edit-user`                      | Muestra el formulario de edición                       |
| `/profile-teacher/create-teacher`         | Muestra el formulario para crear el perfil de profesor |
| `/profile-teacher/edit-teacher`           | Muestra el formulario de edición del profesor          |
| `/profile-teacher/create-course`          | Muestra el formulario para crear un curso              |
| `/profile-teacher/edit-course/:course_id` | Muestra el formulario de edición del curso             |
