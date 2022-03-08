use std::net::{TcpListener,TcpStream};
use std::io::prelude::*;
use std::fs;
fn main() {
    /*TcpListener прослушивает TCP соединение. bind работает как new, возвращает TcpListener. bind = привязка.
    bind возвращает Result<T,E>
    unwrap используется для остановки программы в случае возникновения ошибки. 
    */ 
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    /*incoming() возвращает итератор, дающий последовательность потоков TcpStream. Поток = открытое соединение
    клиент-сервер. Соединение - это полный процесс запроса и ответа, в котором клиент подключается к серверу,
    сервер генерирует ответ, и сервер разрывает соединение. Таким образом TcpStream позволяет прочитать из себя
    всё что отправил клиент, а затем даёт возможность записать это в поток. for обрабатывает каждое 
    соединение по очереди.
    */
    for stream in listener.incoming(){
        //обработка потока состоит только из вызова unwrap
        let stream = stream.unwrap();
        //вызов метода обработки соединения
        handle_connection(stream);
    }
}
//Функция для обработки соединения. Считываем данные из потока TCP и печатаем.
/*Делаем stream mutable, так как TcpStream отслеживает какие данные он возвращает.
stream может прочитать больше данных чем мы запрашиваем, и сохранить их для след. раза.
*/
fn handle_connection(mut stream: TcpStream){
//Для считывания данных из потока мы объявляем bufer в стеке для хранения и считывания данных
    let mut buffer = [0; 1024];
//Передаём буфер в stream.read, который считывает байты из TcpStream и помещает в буфер.
    stream.read(&mut buffer).unwrap();
/*Конвертируем байты из буфера в строку, и печатаем её. String::from_utf8_lossy принимает &[u8]
и создаёт из неё String. (lossy заменяет недопустимые символы на �)
*/
    //println!("Request: {}", String::from_utf8_lossy(&buffer[..]));
    //Считываем в contents содержимое файла hello.html
    let contents = fs::read_to_string("hello.html").unwrap();
    /*Используем format! чтобы добавить содержимое файла в качестве тела ответа
    об успешном завершении. Чтобы гарантировать действительный HTTP ответ, мы дабавляем заголовок
    Content-Length, который имеет размер тела нашего ответа, в данном случае размер hello.html */
    let response = format!("HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}",
                                contents.len(),
                                contents);

    //Метод write в stream принимает &[u8] и отправляет эти байты напрямую соединению.
    stream.write(response.as_bytes()).unwrap();
    //flush подождёт и предотвратит продолжение программы, пока все байты не будут записаны.
    stream.flush().unwrap();
}

//Выше просто однопоточное соединение, которое просто возвращает html
//Реализация выборочного возвращения ответа выглядит следующим образом:

/*
fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    //Жёстко кодируем данные в переменную get.
    //преобразуем get в байтовую строку, добавляя синтаксис байтовой строки b"" в начало содержимого.
    let get = b"GET / HTTP/1.1\r\n";

    //Далее проверяем начинается ли буфер с байтов в get. Если начинается, то запрос правильный.
    if buffer.starts_with(get) {
        let contents = fs::read_to_string("hello.html").unwrap();

        let response = format!(
            "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}",
            contents.len(),
            contents
        );

        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    //Иначе если буфер не начинается с байтов get, это означает что запрос другой.
    } else {
        let status_line = "HTTP/1.1 404 NOT FOUND";
        let contents = fs::read_to_string("404.html").unwrap();

        let response = format!(
            "{}\r\nContent-Length: {}\r\n\r\n{}",
            status_line,
            contents.len(),
            contents
        );

        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    }
}
*/

//ФАЙЛ 404.html
/*
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello!</title>
  </head>
  <body>
    <h1>Oops!</h1>
    <p>Sorry, I don't know what you're asking for.</p>
  </body>
</html>
*/