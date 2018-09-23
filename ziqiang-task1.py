while 1==1:
    str = input("\n欢迎使用这个小工具，请输入数字选择功能(1:sha256加密  2:base64加密  3:base64解密  4:生成二维码):\n")
    
    if str.isdigit():#判断输入值是否为数字
        x = int(str)
        
        if x == 1:#没有设置空值重新输入，因为空值也有sha256散列值
            import hashlib
            a = input("\n请输入你想进行加密的内容:\n")
            sha256 = hashlib.sha256()
            sha256.update(a.encode('utf-8'))
            res = sha256.hexdigest()
            print("密文为:",res)

        elif x == 2:
            import base64
            str = input("\n请输入你想进行加密的内容:\n")

            
            while str == "":
                str = input("你的输入不符合规范，请重新输入:\n")

            string = str.encode('utf-8')
            bytes = base64.b64encode(string)
            print("密文为:",bytes.decode())

        elif x == 3:
            import base64
            str = input("\n请输入你想进行解密的内容:\n")

            import re#利用正则表达式判断输入的字符串是否含有汉字
            zhPattern = re.compile(u'[\u4e00-\u9fa5]+')
            match = zhPattern.search(str)

            while str == "" or match:
                
                str = input("\n你的输入不符合规范，请重新输入:\n")
                match = zhPattern.search(str)

            try:
                string = str.encode('utf-8')
                text = base64.b64decode(string)
                print("明文为:",text.decode())
                a = 1
            except BaseException:
                a = 0

            while a == 0:

                str = input("\n你的输入不符合规范，请重新输入:\n")
                match = zhPattern.search(str)
                while str == "" or match:
                    str = input("\n你的输入不符合规范，请重新输入:\n")
                try:
                    string = str.encode('utf-8')
                    text = base64.b64decode(string)
                    print("明文为:",text.decode())
                    a = 1
                except BaseException:
                    a = 0
            
        elif x == 4:
            import qrcode
            a = input("\n请输入二维码的内容:\n")

            while a == "":
                a = input("你的输入不符合规范，请重新输入:\n")
            img = qrcode.make(a)
            img.get_image().show()
            img.save('test.png')

        else:
            print("\n你的输入不符合规范，请重新输入:")
    
    else:
        print("\n你的输入不符合规范，请重新输入:")

    

