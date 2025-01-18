using Microsoft.AspNetCore.Components;

namespace Frontend.Client.Pages;

public partial class Sectors : ComponentBase
{

    public int Count = 0;

    public void AddCount()
    {
        Count++;
    }
}