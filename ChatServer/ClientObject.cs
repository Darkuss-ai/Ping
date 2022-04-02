using System;
using System.Net.Sockets;
using System.Text; 
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using MySqlConnector;


namespace ChatServer{

    public class Root{ // Класс для Json. Поля класса = полям json.
        public string username { get; set; }
        public string status { get; set; }

    }
    public class ClientObject{
        protected internal string Id { get; private set; }
        protected internal NetworkStream Stream {get; private set;}
        string userName;
        TcpClient client;
        ServerObject server; // объект сервера
 
        public ClientObject(TcpClient tcpClient, ServerObject serverObject){
            Id = Guid.NewGuid().ToString();
            client = tcpClient;
            server = serverObject;
            serverObject.AddConnection(this);
        }

        static Root JsonParse(string path, out string str){
            str = "";
            StreamReader streamReader = new StreamReader(path); // Читаем Json файл
 
            while (!streamReader.EndOfStream) { // До конца файла
                str += streamReader.ReadLine(); // Вписываем в строку весь файл 
            }
            Root des = JsonConvert.DeserializeObject<Root>(str); // Разбор Json файла
            return des; // Возвращаем
        }
 
        public void Process(){
        
            var connection = new MySqlConnection("Server=127.0.0.1;Port=3306;Database=ping; Uid=darkuss; Pwd=ss3385973ss;");
            connection.Open();
            var command = new MySqlCommand("SELECT * FROM Content",connection);
            var reader = command.ExecuteReader();
                
            string str;
            Root JSON = JsonParse("./testUsername.json", out str);
            //Console.WriteLine(JSON.username);
            //Console.WriteLine(JSON.status);
            //Console.WriteLine(str);

            try{
                Stream = client.GetStream();
                // получаем имя пользователя
                string message = GetMessage();
                userName = message;
                //Console.WriteLine(this.Id);
                //while(reader.Read())
                    //Console.WriteLine(reader.GetString(1));
 
                message = userName + " вошел в чат";
                // посылаем сообщение о входе в чат всем подключенным пользователям
                server.BroadcastMessage(message, this.Id);
                Console.WriteLine(message);
                // в бесконечном цикле получаем сообщения от клиента
                while (true){
                    try{
                        message = GetMessage();
                        message = String.Format("{0}: {1}", userName, message);
                        Console.WriteLine(message);
                        server.BroadcastMessage(message, this.Id);
                        //Console.WriteLine(this.Id);
                    }
                    catch{
                        message = String.Format("{0}: покинул чат", userName);
                        Console.WriteLine(message);
                        server.BroadcastMessage(message, this.Id);
                        break;
                    }
                }
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
            }
            finally{
                // в случае выхода из цикла закрываем ресурсы
                server.RemoveConnection(this.Id);
                Close();
            }
        }
 
        // чтение входящего сообщения и преобразование в строку
        private string GetMessage(){
            byte[] data = new byte[64]; // буфер для получаемых данных
            StringBuilder builder = new StringBuilder();
            int bytes = 0;
            do{
                bytes = Stream.Read(data, 0, data.Length);
                builder.Append(Encoding.Unicode.GetString(data, 0, bytes));
            }
            while (Stream.DataAvailable);
 
            return builder.ToString();
        }
 
        // закрытие подключения
        protected internal void Close(){
            if (Stream != null)
                Stream.Close();
            if (client != null)
                client.Close();
        }
    }
}