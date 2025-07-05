mkdir certificates -Force
$cert = New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My" -KeyUsage KeyEncipherment,DataEncipherment,KeyAgreement -KeySpec KeyExchange -KeyLength 2048
$pwd = ConvertTo-SecureString -String "password" -Force -AsPlainText
$path = "certificates\localhost.pfx"
Export-PfxCertificate -cert $cert -FilePath $path -Password $pwd
Write-Host "Certificate created at: $path"
Write-Host "Password: password"
