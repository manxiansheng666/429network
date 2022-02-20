#include "tcp_test.h"

#include "lwip/opt.h"
#include "lwip/sockets.h"
#include "lwip/sys.h"
#include "lwip/api.h"

#include "cmsis_os.h"
#include "main.h"
#include "debug.h"

//Ö÷Ïß³Ì
extern void MX_LWIP_Init(void);
void StartDefaultTask(void *argument)
{
	MX_LWIP_Init();
	int sock = -1;
	struct sockaddr_in server_addr;
	
	sock = socket(AF_INET, SOCK_STREAM, 0);
	if(sock == -1)
	{
		myprintf("socket is OK!\r\n");
	}
	server_addr.sin_family = AF_INET;
	inet_pton(AF_INET,"192.168.1.149",&server_addr.sin_addr.s_addr);
	server_addr.sin_port = htons(8888);
	memset(&(server_addr.sin_zero), 0, sizeof(server_addr.sin_zero));
	uint8_t len;
	uint16_t time = 0;
	while(1)
	{
		if(connect(sock,(struct sockaddr *)&server_addr,sizeof(server_addr)) == 0)
		{
			myprintf("connect is OK!\r\n");
			break;
		}
		osDelay(200);
		myprintf("connect is fail!\r\n");
	}
	char *buf = (char *)pvPortMalloc(100);
	while(1)
	{
		memset(buf,0,100);
		snprintf(buf,100,"time is %d\r\n",time++);
		len = write(sock,buf,strlen(buf));
		if(len <= 0)
		{
			myprintf("connect is break!\r\n");
			break;
		}
		osDelay(200);
	}
	close(sock);
	while(1)
	{
		osDelay(400);
		myprintf("0");
	}
}




void StartTask02(void *argument)
{
	uint16_t time = 0;
  while(1)
  {
    osDelay(200);
	HAL_GPIO_TogglePin(led_GPIO_Port,led_Pin);
//	  myprintf("time is %d\r\n",time++);
  }
}

