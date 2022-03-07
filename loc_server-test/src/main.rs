use std::io;
use std::time;
use std::net::{TcpListener,TcpStream};
use std::io::{Read,Write};
use std::thread;
use loc_server_test::ThreadPool;
fn main() {
    let receiver_listener = TcpListener::bind("127.0.0.1:7878").expect("Failed and bind with the sender");
    // Getting a handle of the underlying thread.
    let size = 4;
    let pool = ThreadPool::new(size);
    let mut con = false;

    // listen to incoming connections messages and bind them to a sever socket address.
    for stream in receiver_listener.incoming() {
        if con == false{
            con = true;
            let stream = stream.expect("failed");

            pool.execute(|| {
                handle_sender(stream, 1);
            });
        }

        else {
            con = false;
            let stream = stream.expect("failed");

            pool.execute(|| {
                handle_sender(stream, 2);
            });
        }
        // let the receiver connect with the sender
        // Можно вместо bool сделать тупо i64 и увеличивать её каждый раз
        //Когда кто-то подключается, но я тестировал на 2 клиентах
        
        
        println!("Shutting down.");
    }
}

fn handle_sender(mut stream: TcpStream, mut id: u8) -> io::Result<()>{
    let mut buf = [0;1024];
    for _ in 0..1000{
        let bytes_read = stream.read(&mut buf)?;
        if bytes_read == 0{
            return Ok(());
        }
        stream.write(&buf[..bytes_read])?;
        println!("from the sender{}:{}", id, String::from_utf8_lossy(&buf));
        thread::sleep(time::Duration::from_secs(1)); 
    }
    Ok(())
}