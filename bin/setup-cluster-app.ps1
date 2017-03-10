Connect-ServiceFabricCluster localhost:19000

Write-Host 'Handling Dummy service'
Write-Host 'Copying application package...'
Copy-ServiceFabricApplicationPackage -ApplicationPackagePath '..\dummy-node-sfpkg' -ImageStoreConnectionString 'file:C:\SfDevCluster\Data\ImageStoreShare' -ApplicationPackagePathInImageStore 'Store\DummyNodeType'

Write-Host 'Registering application type...'
Register-ServiceFabricApplicationType -ApplicationPathInImageStore 'Store\DummyNodeType' -TimeoutSec 600

New-ServiceFabricApplication -ApplicationName 'fabric:/DummyNodeApp' -ApplicationTypeName 'DummyNodeType' -ApplicationTypeVersion 1.0 -TimeoutSec 600
