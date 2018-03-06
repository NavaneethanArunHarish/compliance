import rsa
from base64 import b64encode, b64decode





data = "Hello User, This is your license!"

keysize = 2048
(public, private) = rsa.newkeys(keysize)
encrypted = b64encode(rsa.encrypt(data, public))
decrypted = rsa.decrypt(b64decode(encrypted), private)
signature = b64encode(rsa.sign(data, private, "SHA-512"))
verify = rsa.verify(data, b64decode(signature), public)

f = open('PublicKey.pem','w')
f.write(public.exportKey('PEM'))
f.close()

f = open('PrivateKey.pem','w')
f.write(private.exportKey('PEM'))
f.close()

#print(private.exportKey('PEM'))
#print(public.exportKey('PEM'))
#print("Encrypted: " + encrypted)
#print("Decrypted: '%s'" % decrypted)
print("Signature: " + signature)
#print("Verify: %s" % verify)
print("Key generated !")

