import rsa
from base64 import b64encode, b64decode
from Crypto.PublicKey import RSA

from sys import argv

data = "Hello User, This is your license!"
#public = open("PublicKey.pem", "r").read()
#private = open("PrivateKey.pem", "r").read()

def validation(public_path, *args):
    public = open(public_path, "r").read()
    private = open("PrivateKey.pem", "r").read()

    PublicKey = RSA.importKey(public)
    PrivateKey = RSA.importKey(private)

    signature = b64encode(rsa.sign(data, PrivateKey, "SHA-512"))

    verify = rsa.verify(data, b64decode(signature), PublicKey)

    #print("Signature: " + signature)
    print("Verify: %s" % verify)
    if verify is True:
        print("Authentication Success!")
        return "authentication Suceess!"
    else:
        print("Authentication Failed!")
        return "authentication Failed!"

validation(*argv[1:])