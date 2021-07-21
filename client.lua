local disableManualShutdown = GetConvarInt('pe-basicloading:disableAutoShutdown', 0) == 1

local function shutdownHandler()
  CreateThread(function()
    SendLoadingScreenMessage(json.encode({
      fullyLoaded = true
    }))
    Wait(5000)
    ShutdownLoadingScreenNui(true)
  end)
end

--if not disableManualShutdown then
--  AddEventHandler('playerSpawned', shutdownHandler)
--end

exports('shutdown', shutdownHandler)