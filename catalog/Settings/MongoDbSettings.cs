namespace Catalog.Settings
{
    public class MongoDbSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }

        public string ConnectionString
        {
            get
            {
                return "mongodb://catalog-mongo-srv:27017/catalog";
            }
        }
    }
}