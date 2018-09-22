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
            
            while str.strip() == "":
                str = input("\n请输入你想进行加密的内容:\n")

            string = str.encode('utf-8')
            base64_bytes = base64.b64encode(string)
            print("\n密文为:",base64_bytes.decode())

        elif x == 3:#有一个不完善的地方，输入汉字（不合法输入）时得到的明文为空，我还不会解决
            import base64
            str = input("\n请输入你想进行解密的内容:\n")

            while str.strip() == "":
                str = input("\n请输入你想进行解密的内容:\n")

            string = str.encode('utf-8')
            try:
                text = base64.b64decode(string)
                
                if text.strip() == "":
                    print("请输入正确的base64编码")
                else:
                    print("\n明文为:",text.decode())
                
            except BaseException:
                print("请输入正确的base64编码")

        elif x == 4:
            import qrcode
            a = input("\n请输入二维码的内容:\n")

            while a.strip() == "":
                a = input("\n请输入二维码的内容:\n")
            img = qrcode.make(a)
            img.get_image().show()
            img.save('test.png')

        else:
            print("\n你的输入不符合规范，请重新输入")
    
    else:
        print("\n你的输入不符合规范，请重新输入")

    

