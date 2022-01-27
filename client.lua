local firstSpawn = false
local disableManualShutdown = GetConvarInt('pe-basicloading:disableAutoShutdown', 0) == 1

local function shutdownHandler()
    if firstSpawn then return end
    firstSpawn = true
    SendLoadingScreenMessage(json.encode({fullyLoaded = true}))
    ShutdownLoadingScreenNui(true)
end

if not disableManualShutdown then
  AddEventHandler('playerSpawned', shutdownHandler)
end

exports('shutdown', shutdownHandler)