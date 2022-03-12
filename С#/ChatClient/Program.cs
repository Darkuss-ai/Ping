using System;
using System.Threading;
using System.Net.Sockets;
using System.Text;
using Newtonsoft.Json;
using System.IO;
 
namespace ChatClient{

    public class Root{
        public string id { get; set; }
        public string username { get; set; }
        public string login { get; set; }
        public string pass { get; set; }
        public string type { get; set; }
    }


    class Program{
        static string userName;
        private const string host = "127.0.0.1";
        private const int port = 8888;
        static TcpClient client;
        static NetworkStream stream;


        static Root JsonParse(string path){
            string str = "";
            StreamReader streamReader = new StreamReader(path); // Читаем Json файл
 
            while (!streamReader.EndOfStream) { // До конца файла
                str += streamReader.ReadLine();  // Вписываем в строку весь файл 
            }
            Root des = JsonConvert.DeserializeObject<Root>(str); // Разбор Json файла
            return des; // Возвращаем
        }
 
        static void Main(string[] args){
            
            Root JSON = JsonParse("../testUsername.json"); //Просто передаём в функцию нужный для
                                                          // парса файл и в переменной будет то, что нам необходимо.

            userName = JSON.username; //Теперь можем использовать оператор . по отношению к полям нашего Json
            Console.WriteLine("Username's data: login: {0}, pass: {1}, type: {2}", JSON.login, JSON.pass, JSON.type);
            
            Console.WriteLine("ВАШЕ ИМЯ: {0}", userName);
            client = new TcpClient();
            try{
                client.Connect(host, port); //подключение клиента
                stream = client.GetStream(); // получаем поток
 
                string message = userName;
                byte[] data = Encoding.Unicode.GetBytes(message);
                stream.Write(data, 0, data.Length);
 
                // запускаем новый поток для получения данных
                Thread receiveThread = new Thread(new ThreadStart(ReceiveMessage));
                receiveThread.Start(); //старт потока
                Console.WriteLine("Добро пожаловать, {0}", userName);
                SendMessage();
            }
            catch (Exception ex){
                Console.WriteLine(ex.Message);
            }
            finally{
                Disconnect();
            }
        }
        // отправка сообщений
        static void SendMessage(){
            Console.WriteLine("Введите сообщение: ");
             
            while (true){
                string message = Console.ReadLine();
                byte[] data = Encoding.Unicode.GetBytes(message);
                stream.Write(data, 0, data.Length);
            }
        }
        // получение сообщений
        static void ReceiveMessage(){
            while (true){
                try{
                    byte[] data = new byte[64]; // буфер для получаемых данных
                    StringBuilder builder = new StringBuilder();
                    int bytes = 0;
                    do{
                        bytes = stream.Read(data, 0, data.Length);
                        builder.Append(Encoding.Unicode.GetString(data, 0, bytes));
                    }
                    while (stream.DataAvailable);
 
                    string message = builder.ToString();
                    Console.WriteLine(message);//вывод сообщения
                }
                catch{
                    Console.WriteLine("Подключение прервано!"); //соединение было прервано
                    Console.ReadLine();
                    Disconnect();
                }
            }
        }
 
        static void Disconnect(){
            if(stream!=null)
                stream.Close();//отключение потока
            if(client!=null)
                client.Close();//отключение клиента
            Environment.Exit(0); //завершение процесса
        }
    }
}