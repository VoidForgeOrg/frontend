using Microsoft.AspNetCore.Components;
using VoidForge.Universe.Client;
namespace Frontend.Components.Pages;

public partial class Segments : ComponentBase
{
    public string Test = "test text";
    [Inject]
    public ISegmentClient SegmentClient { get; set; }
    [Inject]
    public IEntityClient EntityClient { get; set; }
    
    public List<Entity> Entities { get; set; } = new();
    protected override async Task OnInitializedAsync()
    {
        await GetSegments();
    }
    public async Task<string> GetSegments()
    {
      //  var Segments = await SegmentClient.GetSegmentsAsync();
        var entitiesResponse = await EntityClient.GetEntitiesAsync();
        Entities = entitiesResponse.Items;
        return "test";
    }
}