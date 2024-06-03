<<<<<<< HEAD
import paho.mqtt.client as mqtt
import random
import requests
#140.115.216.171
#192.168.205.13
broker_address = "192.168.137.1"
client_id = f'python-mqtt-{random.randint(0, 1000)}'

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker with result code "+str(rc))
    client.subscribe("traffic_light/topic")

def on_message(client, userdata, message):
    re_mes = str(message.payload.decode("utf-8"))
    if "license" in re_mes:
        re_mes = re_mes[len("license_"):]
        print(re_mes)
        # 将接收到的数据发送到 Flask 服务器的端点
        response = requests.post('http://127.0.0.1:8081/update_data', json={'license': re_mes})
        print(response.text)

#client = mqtt.Client()
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_connect = on_connect
client.on_message = on_message
client.connect(broker_address)
client.loop_forever()
=======
import paho.mqtt.client as mqtt
import random
import requests
#140.115.216.171
#192.168.205.13
broker_address = "192.168.137.1"
client_id = f'python-mqtt-{random.randint(0, 1000)}'

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker with result code "+str(rc))
    client.subscribe("traffic_light/topic")

def on_message(client, userdata, message):
    re_mes = str(message.payload.decode("utf-8"))
    if "license" in re_mes:
        re_mes = re_mes[len("license_"):]
        print(re_mes)
        # 将接收到的数据发送到 Flask 服务器的端点
        response = requests.post('http://127.0.0.1:8081/update_data', json={'license': re_mes})
        print(response.text)

#client = mqtt.Client()
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_connect = on_connect
client.on_message = on_message
client.connect(broker_address)
client.loop_forever()
>>>>>>> e3a4cdd76334102bd74ea11326630f15c1bf8e73
