#include "tcp_test.h"

#include "lwip/opt.h"
#include <lwip/sockets.h>

#include "lwip/sys.h"
#include "lwip/api.h"
#include "cmsis_os.h"

void StartTask02(void *argument)
{
  while(1)
  {
    osDelay(100);
	HAL_GPIO_TogglePin(led_GPIO_Port,led_Pin);
  }
}

