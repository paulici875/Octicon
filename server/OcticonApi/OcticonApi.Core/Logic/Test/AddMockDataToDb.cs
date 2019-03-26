using OcticonApi.Domain.Test;

namespace OcticonApi.Logic.Test
{
    public class AddMockDataToDb
    {
        private AddMockDataToDbProvider _provider = new AddMockDataToDbProvider();

        public void Execute()
        {
            _provider.AddMockData();
        }
    }
}
