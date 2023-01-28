export const obsTypes = {
  GetPersistentData: {
    /**
     * The data realm to select. `OBS_WEBSOCKET_DATA_REALM_GLOBAL` or `OBS_WEBSOCKET_DATA_REALM_PROFILE`
     */
    realm: 'string',
    /**
     * The name of the slot to retrieve data from
     */
    slotName: 'string',
  },
  SetPersistentData: {
    /**
     * The data realm to select. `OBS_WEBSOCKET_DATA_REALM_GLOBAL` or `OBS_WEBSOCKET_DATA_REALM_PROFILE`
     */
    realm: 'string',
    /**
     * The name of the slot to retrieve data from
     */
    slotName: 'string',
    /**
     * The value to apply to the slot
     */
    slotValue: 'value',
  },
  GetSceneCollectionList: 'never',
  SetCurrentSceneCollection: {
    /**
     * Name of the scene collection to switch to
     */
    sceneCollectionName: 'string',
  },
  CreateSceneCollection: {
    /**
     * Name for the new scene collection
     */
    sceneCollectionName: 'string',
  },
  GetProfileList: 'never',
  SetCurrentProfile: {
    /**
     * Name of the profile to switch to
     */
    profileName: 'string',
  },
  CreateProfile: {
    /**
     * Name for the new profile
     */
    profileName: 'string',
  },
  RemoveProfile: {
    /**
     * Name of the profile to remove
     */
    profileName: 'string',
  },
  GetProfileParameter: {
    /**
     * Category of the parameter to get
     */
    parameterCategory: 'string',
    /**
     * Name of the parameter to get
     */
    parameterName: 'string',
  },
  SetProfileParameter: {
    /**
     * Category of the parameter to set
     */
    parameterCategory: 'string',
    /**
     * Name of the parameter to set
     */
    parameterName: 'string',
    /**
     * Value of the parameter to set. Use `null` to delete
     */
    parameterValue: 'string',
  },
  GetVideoSettings: 'never',
  SetVideoSettings: {
    /**
     * Numerator of the fractional FPS value
     *
     * @restrictions >= 1
     * @defaultValue Not changed
     */
    fpsNumerator: 'number?',
    /**
     * Denominator of the fractional FPS value
     *
     * @restrictions >= 1
     * @defaultValue Not changed
     */
    fpsDenominator: 'number?',
    /**
     * Width of the base (canvas) resolution in pixels
     *
     * @restrictions >= 1, <= 4096
     * @defaultValue Not changed
     */
    baseWidth: 'number?',
    /**
     * Height of the base (canvas) resolution in pixels
     *
     * @restrictions >= 1, <= 4096
     * @defaultValue Not changed
     */
    baseHeight: 'number?',
    /**
     * Width of the output resolution in pixels
     *
     * @restrictions >= 1, <= 4096
     * @defaultValue Not changed
     */
    outputWidth: 'number?',
    /**
     * Height of the output resolution in pixels
     *
     * @restrictions >= 1, <= 4096
     * @defaultValue Not changed
     */
    outputHeight: 'number?',
  },
  GetStreamServiceSettings: 'never',
  SetStreamServiceSettings: {
    /**
     * Type of stream service to apply. Example: `rtmp_common` or `rtmp_custom`
     */
    streamServiceType: 'string',
    /**
     * Settings to apply to the service
     */
    streamServiceSettings: 'object',
  },
  GetRecordDirectory: 'never',
  GetSourceFilterList: {
    /**
     * Name of the source
     */
    sourceName: 'string',
  },
  GetSourceFilterDefaultSettings: {
    /**
     * Filter kind to get the default settings for
     */
    filterKind: 'string',
  },
  CreateSourceFilter: {
    /**
     * Name of the source to add the filter to
     */
    sourceName: 'string',
    /**
     * Name of the new filter to be created
     */
    filterName: 'string',
    /**
     * The kind of filter to be created
     */
    filterKind: 'string',
    /**
     * Settings object to initialize the filter with
     *
     * @defaultValue Default settings used
     */
    filterSettings: 'object?',
  },
  RemoveSourceFilter: {
    /**
     * Name of the source the filter is on
     */
    sourceName: 'string',
    /**
     * Name of the filter to remove
     */
    filterName: 'string',
  },
  SetSourceFilterName: {
    /**
     * Name of the source the filter is on
     */
    sourceName: 'string',
    /**
     * Current name of the filter
     */
    filterName: 'string',
    /**
     * New name for the filter
     */
    newFilterName: 'string',
  },
  GetSourceFilter: {
    /**
     * Name of the source
     */
    sourceName: 'string',
    /**
     * Name of the filter
     */
    filterName: 'string',
  },
  SetSourceFilterIndex: {
    /**
     * Name of the source the filter is on
     */
    sourceName: 'string',
    /**
     * Name of the filter
     */
    filterName: 'string',
    /**
     * New index position of the filter
     *
     * @restrictions >= 0
     */
    filterIndex: 'number',
  },
  SetSourceFilterSettings: {
    /**
     * Name of the source the filter is on
     */
    sourceName: 'string',
    /**
     * Name of the filter to set the settings of
     */
    filterName: 'string',
    /**
     * Object of settings to apply
     */
    filterSettings: 'object',
    /**
     * True == apply the settings on top of existing ones, False == reset the input to its defaults, then apply settings.
     *
     * @defaultValue true
     */
    overlay: 'boolean?',
  },
  SetSourceFilterEnabled: {
    /**
     * Name of the source the filter is on
     */
    sourceName: 'string',
    /**
     * Name of the filter
     */
    filterName: 'string',
    /**
     * New enable state of the filter
     */
    filterEnabled: 'boolean',
  },
  GetVersion: 'never',
  GetStats: 'never',
  BroadcastCustomEvent: {
    /**
     * Data payload to emit to all receivers
     */
    eventData: 'object',
  },
  CallVendorRequest: {
    /**
     * Name of the vendor to use
     */
    vendorName: 'string',
    /**
     * The request type to call
     */
    requestType: 'string',
    /**
     * Object containing appropriate request data
     *
     * @defaultValue {}
     */
    requestData: 'object?',
  },
  GetHotkeyList: 'never',
  TriggerHotkeyByName: {
    /**
     * Name of the hotkey to trigger
     */
    hotkeyName: 'string',
  },
  TriggerHotkeyByKeySequence: {
    /**
     * The OBS key ID to use. See https://github.com/obsproject/obs-studio/blob/master/libobs/obs-hotkeys.h
     *
     * @defaultValue Not pressed
     */
    keyId: 'string?',
    /**
     * Object containing key modifiers to apply
     *
     * @defaultValue Ignored
     */
    keyModifiers: {
      /**
       * Press Shift
       *
       * @defaultValue Not pressed
       */
      shift: 'boolean?',
      /**
       * Press CTRL
       *
       * @defaultValue Not pressed
       */
      control: 'boolean?',
      /**
       * Press ALT
       *
       * @defaultValue Not pressed
       */
      alt: 'boolean?',
      /**
       * Press CMD (Mac)
       *
       * @defaultValue Not pressed
       */
      command: 'boolean?',
    },
  },
  Sleep: {
    /**
     * Number of milliseconds to sleep for (if `SERIAL_REALTIME` mode)
     *
     * @restrictions >= 0, <= 50000
     */
    sleepMillis: 'number',
    /**
     * Number of frames to sleep for (if `SERIAL_FRAME` mode)
     *
     * @restrictions >= 0, <= 10000
     */
    sleepFrames: 'number',
  },
  GetInputList: {
    /**
     * Restrict the array to only inputs of the specified kind
     *
     * @defaultValue All kinds included
     */
    inputKind: 'string?',
  },
  GetInputKindList: {
    /**
     * True == Return all kinds as unversioned, False == Return with version suffixes (if available)
     *
     * @defaultValue false
     */
    unversioned: 'boolean?',
  },
  GetSpecialInputs: 'never',
  CreateInput: {
    /**
     * Name of the scene to add the input to as a scene item
     */
    sceneName: 'string',
    /**
     * Name of the new input to created
     */
    inputName: 'string',
    /**
     * The kind of input to be created
     */
    inputKind: 'string',
    /**
     * Settings object to initialize the input with
     *
     * @defaultValue Default settings used
     */
    inputSettings: 'object?',
    /**
     * Whether to set the created scene item to enabled or disabled
     *
     * @defaultValue True
     */
    sceneItemEnabled: 'boolean?',
  },
  RemoveInput: {
    /**
     * Name of the input to remove
     */
    inputName: 'string',
  },
  SetInputName: {
    /**
     * Current input name
     */
    inputName: 'string',
    /**
     * New name for the input
     */
    newInputName: 'string',
  },
  GetInputDefaultSettings: {
    /**
     * Input kind to get the default settings for
     */
    inputKind: 'string',
  },
  GetInputSettings: {
    /**
     * Name of the input to get the settings of
     */
    inputName: 'string',
  },
  SetInputSettings: {
    /**
     * Name of the input to set the settings of
     */
    inputName: 'string',
    /**
     * Object of settings to apply
     */
    inputSettings: 'object',
    /**
     * True == apply the settings on top of existing ones, False == reset the input to its defaults, then apply settings.
     *
     * @defaultValue true
     */
    overlay: 'boolean?',
  },
  GetInputMute: {
    /**
     * Name of input to get the mute state of
     */
    inputName: 'string',
  },
  SetInputMute: {
    /**
     * Name of the input to set the mute state of
     */
    inputName: 'string',
    /**
     * Whether to mute the input or not
     */
    inputMuted: 'boolean',
  },
  ToggleInputMute: {
    /**
     * Name of the input to toggle the mute state of
     */
    inputName: 'string',
  },
  GetInputVolume: {
    /**
     * Name of the input to get the volume of
     */
    inputName: 'string',
  },
  SetInputVolume: {
    /**
     * Name of the input to set the volume of
     */
    inputName: 'string',
    /**
     * Volume setting in mul
     *
     * @restrictions >= 0, <= 20
     * @defaultValue `inputVolumeDb` should be specified
     */
    inputVolumeMul: 'number?',
    /**
     * Volume setting in dB
     *
     * @restrictions >= -100, <= 26
     * @defaultValue `inputVolumeMul` should be specified
     */
    inputVolumeDb: 'number?',
  },
  GetInputAudioBalance: {
    /**
     * Name of the input to get the audio balance of
     */
    inputName: 'string',
  },
  SetInputAudioBalance: {
    /**
     * Name of the input to set the audio balance of
     */
    inputName: 'string',
    /**
     * New audio balance value
     *
     * @restrictions >= 0.0, <= 1.0
     */
    inputAudioBalance: 'number',
  },
  GetInputAudioSyncOffset: {
    /**
     * Name of the input to get the audio sync offset of
     */
    inputName: 'string',
  },
  SetInputAudioSyncOffset: {
    /**
     * Name of the input to set the audio sync offset of
     */
    inputName: 'string',
    /**
     * New audio sync offset in milliseconds
     *
     * @restrictions >= -950, <= 20000
     */
    inputAudioSyncOffset: 'number',
  },
  GetInputAudioMonitorType: {
    /**
     * Name of the input to get the audio monitor type of
     */
    inputName: 'string',
  },
  SetInputAudioMonitorType: {
    /**
     * Name of the input to set the audio monitor type of
     */
    inputName: 'string',
    /**
     * Audio monitor type
     */
    monitorType: 'string',
  },
  GetInputAudioTracks: {
    /**
     * Name of the input
     */
    inputName: 'string',
  },
  SetInputAudioTracks: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * Track settings to apply
     */
    inputAudioTracks: 'object',
  },
  GetInputPropertiesListPropertyItems: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * Name of the list property to get the items of
     */
    propertyName: 'string',
  },
  PressInputPropertiesButton: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * Name of the button property to press
     */
    propertyName: 'string',
  },
  GetMediaInputStatus: {
    /**
     * Name of the media input
     */
    inputName: 'string',
  },
  SetMediaInputCursor: {
    /**
     * Name of the media input
     */
    inputName: 'string',
    /**
     * New cursor position to set
     *
     * @restrictions >= 0
     */
    mediaCursor: 'number',
  },
  OffsetMediaInputCursor: {
    /**
     * Name of the media input
     */
    inputName: 'string',
    /**
     * Value to offset the current cursor position by
     */
    mediaCursorOffset: 'number',
  },
  TriggerMediaInputAction: {
    /**
     * Name of the media input
     */
    inputName: 'string',
    /**
     * Identifier of the `ObsMediaInputAction` enum
     */
    mediaAction: 'string',
  },
  GetVirtualCamStatus: 'never',
  ToggleVirtualCam: 'never',
  StartVirtualCam: 'never',
  StopVirtualCam: 'never',
  GetReplayBufferStatus: 'never',
  ToggleReplayBuffer: 'never',
  StartReplayBuffer: 'never',
  StopReplayBuffer: 'never',
  SaveReplayBuffer: 'never',
  GetLastReplayBufferReplay: 'never',
  GetRecordStatus: 'never',
  ToggleRecord: 'never',
  StartRecord: 'never',
  StopRecord: 'never',
  ToggleRecordPause: 'never',
  PauseRecord: 'never',
  ResumeRecord: 'never',
  GetSceneItemList: {
    /**
     * Name of the scene to get the items of
     */
    sceneName: 'string',
  },
  GetGroupSceneItemList: {
    /**
     * Name of the group to get the items of
     */
    sceneName: 'string',
  },
  GetSceneItemId: {
    /**
     * Name of the scene or group to search in
     */
    sceneName: 'string',
    /**
     * Name of the source to find
     */
    sourceName: 'string',
    /**
     * Number of matches to skip during search. >= 0 means first forward. -1 means last (top) item
     *
     * @restrictions >= -1
     * @defaultValue 0
     */
    searchOffset: 'number?',
  },
  CreateSceneItem: {
    /**
     * Name of the scene to create the new item in
     */
    sceneName: 'string',
    /**
     * Name of the source to add to the scene
     */
    sourceName: 'string',
    /**
     * Enable state to apply to the scene item on creation
     *
     * @defaultValue True
     */
    sceneItemEnabled: 'boolean?',
  },
  RemoveSceneItem: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
  },
  DuplicateSceneItem: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
    /**
     * Name of the scene to create the duplicated item in
     *
     * @defaultValue `sceneName` is assumed
     */
    destinationSceneName: 'string?',
  },
  GetSceneItemTransform: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
  },
  SetSceneItemTransform: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
    /**
     * Object containing scene item transform info to update
     */
    sceneItemTransform: 'object',
  },
  GetSceneItemEnabled: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
  },
  SetSceneItemEnabled: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
    /**
     * New enable state of the scene item
     */
    sceneItemEnabled: 'boolean',
  },
  GetSceneItemLocked: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
  },
  SetSceneItemLocked: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
    /**
     * New lock state of the scene item
     */
    sceneItemLocked: 'boolean',
  },
  GetSceneItemIndex: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
  },
  SetSceneItemIndex: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
    /**
     * New index position of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemIndex: 'number',
  },
  GetSceneItemBlendMode: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
  },
  SetSceneItemBlendMode: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     *
     * @restrictions >= 0
     */
    sceneItemId: 'number',
    /**
     * New blend mode
     */
    sceneItemBlendMode: 'string',
  },
  GetSceneList: 'never',
  GetGroupList: 'never',
  GetCurrentProgramScene: 'never',
  SetCurrentProgramScene: {
    /**
     * Scene to set as the current program scene
     */
    sceneName: 'string',
  },
  GetCurrentPreviewScene: 'never',
  SetCurrentPreviewScene: {
    /**
     * Scene to set as the current preview scene
     */
    sceneName: 'string',
  },
  CreateScene: {
    /**
     * Name for the new scene
     */
    sceneName: 'string',
  },
  RemoveScene: {
    /**
     * Name of the scene to remove
     */
    sceneName: 'string',
  },
  SetSceneName: {
    /**
     * Name of the scene to be renamed
     */
    sceneName: 'string',
    /**
     * New name for the scene
     */
    newSceneName: 'string',
  },
  GetSceneSceneTransitionOverride: {
    /**
     * Name of the scene
     */
    sceneName: 'string',
  },
  SetSceneSceneTransitionOverride: {
    /**
     * Name of the scene
     */
    sceneName: 'string',
    /**
     * Name of the scene transition to use as override. Specify `null` to remove
     *
     * @defaultValue Unchanged
     */
    transitionName: 'string?',
    /**
     * Duration to use for any overridden transition. Specify `null` to remove
     *
     * @restrictions >= 50, <= 20000
     * @defaultValue Unchanged
     */
    transitionDuration: 'number?',
  },
  GetSourceActive: {
    /**
     * Name of the source to get the active state of
     */
    sourceName: 'string',
  },
  GetSourceScreenshot: {
    /**
     * Name of the source to take a screenshot of
     */
    sourceName: 'string',
    /**
     * Image compression format to use. Use `GetVersion` to get compatible image formats
     */
    imageFormat: 'string',
    /**
     * Width to scale the screenshot to
     *
     * @restrictions >= 8, <= 4096
     * @defaultValue Source value is used
     */
    imageWidth: 'number?',
    /**
     * Height to scale the screenshot to
     *
     * @restrictions >= 8, <= 4096
     * @defaultValue Source value is used
     */
    imageHeight: 'number?',
    /**
     * Compression quality to use. 0 for high compression, 100 for uncompressed. -1 to use "default" (whatever that means, idk)
     *
     * @restrictions >= -1, <= 100
     * @defaultValue -1
     */
    imageCompressionQuality: 'number?',
  },
  SaveSourceScreenshot: {
    /**
     * Name of the source to take a screenshot of
     */
    sourceName: 'string',
    /**
     * Image compression format to use. Use `GetVersion` to get compatible image formats
     */
    imageFormat: 'string',
    /**
     * Path to save the screenshot file to. Eg. `C:\Users\user\Desktop\screenshot.png`
     */
    imageFilePath: 'string',
    /**
     * Width to scale the screenshot to
     *
     * @restrictions >= 8, <= 4096
     * @defaultValue Source value is used
     */
    imageWidth: 'number?',
    /**
     * Height to scale the screenshot to
     *
     * @restrictions >= 8, <= 4096
     * @defaultValue Source value is used
     */
    imageHeight: 'number?',
    /**
     * Compression quality to use. 0 for high compression, 100 for uncompressed. -1 to use "default" (whatever that means, idk)
     *
     * @restrictions >= -1, <= 100
     * @defaultValue -1
     */
    imageCompressionQuality: 'number?',
  },
  GetStreamStatus: 'never',
  ToggleStream: 'never',
  StartStream: 'never',
  StopStream: 'never',
  SendStreamCaption: {
    /**
     * Caption text
     */
    captionText: 'string',
  },
  GetTransitionKindList: 'never',
  GetSceneTransitionList: 'never',
  GetCurrentSceneTransition: 'never',
  SetCurrentSceneTransition: {
    /**
     * Name of the transition to make active
     */
    transitionName: 'string',
  },
  SetCurrentSceneTransitionDuration: {
    /**
     * Duration in milliseconds
     *
     * @restrictions >= 50, <= 20000
     */
    transitionDuration: 'number',
  },
  SetCurrentSceneTransitionSettings: {
    /**
     * Settings object to apply to the transition. Can be `{}`
     */
    transitionSettings: 'object',
    /**
     * Whether to overlay over the current settings or replace them
     *
     * @defaultValue true
     */
    overlay: 'boolean?',
  },
  GetCurrentSceneTransitionCursor: 'never',
  TriggerStudioModeTransition: 'never',
  SetTBarPosition: {
    /**
     * New position
     *
     * @restrictions >= 0.0, <= 1.0
     */
    position: 'number',
    /**
     * Whether to release the TBar. Only set `false` if you know that you will be sending another position update
     *
     * @defaultValue `true`
     */
    release: 'boolean?',
  },
  GetStudioModeEnabled: 'never',
  SetStudioModeEnabled: {
    /**
     * True == Enabled, False == Disabled
     */
    studioModeEnabled: 'boolean',
  },
  OpenInputPropertiesDialog: {
    /**
     * Name of the input to open the dialog of
     */
    inputName: 'string',
  },
  OpenInputFiltersDialog: {
    /**
     * Name of the input to open the dialog of
     */
    inputName: 'string',
  },
  OpenInputInteractDialog: {
    /**
     * Name of the input to open the dialog of
     */
    inputName: 'string',
  },
  GetMonitorList: 'never',
} as const;

export const obsEventTypes = {
  CurrentSceneCollectionChanging: {
    /**
     * Name of the current scene collection
     */
    sceneCollectionName: 'string',
  },
  CurrentSceneCollectionChanged: {
    /**
     * Name of the new scene collection
     */
    sceneCollectionName: 'string',
  },
  SceneCollectionListChanged: {
    /**
     * Updated list of scene collections
     */
    sceneCollections: 'string[]',
  },
  CurrentProfileChanging: {
    /**
     * Name of the current profile
     */
    profileName: 'string',
  },
  CurrentProfileChanged: {
    /**
     * Name of the new profile
     */
    profileName: 'string',
  },
  ProfileListChanged: {
    /**
     * Updated list of profiles
     */
    profiles: 'string[]',
  },
  SourceFilterListReindexed: {
    /**
     * Name of the source
     */
    sourceName: 'string',
    /**
     * Array of filter objects
     */
    filters: 'object',
  },
  SourceFilterCreated: {
    /**
     * Name of the source the filter was added to
     */
    sourceName: 'string',
    /**
     * Name of the filter
     */
    filterName: 'string',
    /**
     * The kind of the filter
     */
    filterKind: 'string',
    /**
     * Index position of the filter
     */
    filterIndex: 'number',
    /**
     * The settings configured to the filter when it was created
     */
    filterSettings: 'object',
    /**
     * The default settings for the filter
     */
    defaultFilterSettings: 'object',
  },
  SourceFilterRemoved: {
    /**
     * Name of the source the filter was on
     */
    sourceName: 'string',
    /**
     * Name of the filter
     */
    filterName: 'string',
  },
  SourceFilterNameChanged: {
    /**
     * The source the filter is on
     */
    sourceName: 'string',
    /**
     * Old name of the filter
     */
    oldFilterName: 'string',
    /**
     * New name of the filter
     */
    filterName: 'string',
  },
  SourceFilterEnableStateChanged: {
    /**
     * Name of the source the filter is on
     */
    sourceName: 'string',
    /**
     * Name of the filter
     */
    filterName: 'string',
    /**
     * Whether the filter is enabled
     */
    filterEnabled: 'boolean',
  },
  ExitStarted: 'undefined',
  InputCreated: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * The kind of the input
     */
    inputKind: 'string',
    /**
     * The unversioned kind of input (aka no `_v2` stuff)
     */
    unversionedInputKind: 'string',
    /**
     * The settings configured to the input when it was created
     */
    inputSettings: 'object',
    /**
     * The default settings for the input
     */
    defaultInputSettings: 'object',
  },
  InputRemoved: {
    /**
     * Name of the input
     */
    inputName: 'string',
  },
  InputNameChanged: {
    /**
     * Old name of the input
     */
    oldInputName: 'string',
    /**
     * New name of the input
     */
    inputName: 'string',
  },
  InputActiveStateChanged: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * Whether the input is active
     */
    videoActive: 'boolean',
  },
  InputShowStateChanged: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * Whether the input is showing
     */
    videoShowing: 'boolean',
  },
  InputMuteStateChanged: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * Whether the input is muted
     */
    inputMuted: 'boolean',
  },
  InputVolumeChanged: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * New volume level in multimap
     */
    inputVolumeMul: 'number',
    /**
     * New volume level in dB
     */
    inputVolumeDb: 'number',
  },
  InputAudioBalanceChanged: {
    /**
     * Name of the affected input
     */
    inputName: 'string',
    /**
     * New audio balance value of the input
     */
    inputAudioBalance: 'number',
  },
  InputAudioSyncOffsetChanged: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * New sync offset in milliseconds
     */
    inputAudioSyncOffset: 'number',
  },
  InputAudioTracksChanged: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * Object of audio tracks along with their associated enable states
     */
    inputAudioTracks: 'object',
  },
  InputAudioMonitorTypeChanged: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * New monitor type of the input
     */
    monitorType: 'string',
  },
  InputVolumeMeters: {
    /**
     * Array of active inputs with their associated volume levels
     */
    inputs: 'object',
  },
  MediaInputPlaybackStarted: {
    /**
     * Name of the input
     */
    inputName: 'string',
  },
  MediaInputPlaybackEnded: {
    /**
     * Name of the input
     */
    inputName: 'string',
  },
  MediaInputActionTriggered: {
    /**
     * Name of the input
     */
    inputName: 'string',
    /**
     * Action performed on the input. See `ObsMediaInputAction` enum
     */
    mediaAction: 'string',
  },
  StreamStateChanged: {
    /**
     * Whether the output is active
     */
    outputActive: 'boolean',
    /**
     * The specific state of the output
     */
    outputState: 'string',
  },
  RecordStateChanged: {
    /**
     * Whether the output is active
     */
    outputActive: 'boolean',
    /**
     * The specific state of the output
     */
    outputState: 'string',
  },
  ReplayBufferStateChanged: {
    /**
     * Whether the output is active
     */
    outputActive: 'boolean',
    /**
     * The specific state of the output
     */
    outputState: 'string',
  },
  VirtualcamStateChanged: {
    /**
     * Whether the output is active
     */
    outputActive: 'boolean',
    /**
     * The specific state of the output
     */
    outputState: 'string',
  },
  ReplayBufferSaved: {
    /**
     * Path of the saved replay file
     */
    savedReplayPath: 'string',
  },
  SceneItemCreated: {
    /**
     * Name of the scene the item was added to
     */
    sceneName: 'string',
    /**
     * Name of the underlying source (input/scene)
     */
    sourceName: 'string',
    /**
     * Numeric ID of the scene item
     */
    sceneItemId: 'number',
    /**
     * Index position of the item
     */
    sceneItemIndex: 'number',
  },
  SceneItemRemoved: {
    /**
     * Name of the scene the item was removed from
     */
    sceneName: 'string',
    /**
     * Name of the underlying source (input/scene)
     */
    sourceName: 'string',
    /**
     * Numeric ID of the scene item
     */
    sceneItemId: 'number',
  },
  SceneItemListReindexed: {
    /**
     * Name of the scene
     */
    sceneName: 'string',
    /**
     * Array of scene item objects
     */
    sceneItems: 'object',
  },
  SceneItemEnableStateChanged: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     */
    sceneItemId: 'number',
    /**
     * Whether the scene item is enabled (visible)
     */
    sceneItemEnabled: 'boolean',
  },
  SceneItemLockStateChanged: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     */
    sceneItemId: 'number',
    /**
     * Whether the scene item is locked
     */
    sceneItemLocked: 'boolean',
  },
  SceneItemSelected: {
    /**
     * Name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     */
    sceneItemId: 'number',
  },
  SceneItemTransformChanged: {
    /**
     * The name of the scene the item is in
     */
    sceneName: 'string',
    /**
     * Numeric ID of the scene item
     */
    sceneItemId: 'number',
    /**
     * New transform/crop info of the scene item
     */
    sceneItemTransform: 'object',
  },
  SceneCreated: {
    /**
     * Name of the new scene
     */
    sceneName: 'string',
    /**
     * Whether the new scene is a group
     */
    isGroup: 'boolean',
  },
  SceneRemoved: {
    /**
     * Name of the removed scene
     */
    sceneName: 'string',
    /**
     * Whether the scene was a group
     */
    isGroup: 'boolean',
  },
  SceneNameChanged: {
    /**
     * Old name of the scene
     */
    oldSceneName: 'string',
    /**
     * New name of the scene
     */
    sceneName: 'string',
  },
  CurrentProgramSceneChanged: {
    /**
     * Name of the scene that was switched to
     */
    sceneName: 'string',
  },
  CurrentPreviewSceneChanged: {
    /**
     * Name of the scene that was switched to
     */
    sceneName: 'string',
  },
  SceneListChanged: {
    /**
     * Updated array of scenes
     */
    scenes: 'object',
  },
  CurrentSceneTransitionChanged: {
    /**
     * Name of the new transition
     */
    transitionName: 'string',
  },
  CurrentSceneTransitionDurationChanged: {
    /**
     * Transition duration in milliseconds
     */
    transitionDuration: 'number',
  },
  SceneTransitionStarted: {
    /**
     * Scene transition name
     */
    transitionName: 'string',
  },
  SceneTransitionEnded: {
    /**
     * Scene transition name
     */
    transitionName: 'string',
  },
  SceneTransitionVideoEnded: {
    /**
     * Scene transition name
     */
    transitionName: 'string',
  },
  StudioModeStateChanged: {
    /**
     * True == Enabled, False == Disabled
     */
    studioModeEnabled: 'boolean',
  },
  VendorEvent: {
    /**
     * Name of the vendor emitting the event
     */
    vendorName: 'string',
    /**
     * Vendor-provided event typedef
     */
    eventType: 'string',
    /**
     * Vendor-provided event data. {} if event does not provide any data
     */
    eventData: 'object',
  },
} as const;

export const obsActions = Object.keys(obsTypes);
export const obsEventNames = Object.keys(obsEventTypes);

type ObsTypeValues = typeof obsTypes[keyof typeof obsTypes];
export type ObsJsonTypes =
  | Extract<ValuesOfUnion<Exclude<ObsTypeValues, string>>, string>
  | Extract<ObsTypeValues, string>;
type ValuesOfUnion<T> = T extends T ? T[keyof T] : never;

export type ObsJsonTypesOptionals = Extract<ObsJsonTypes, `${string}?`>;
