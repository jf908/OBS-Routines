let src = `
export interface OBSEventTypes {
    CurrentSceneCollectionChanging: {
        /**
         * Name of the current scene collection
         */
        sceneCollectionName: string;
    };
    CurrentSceneCollectionChanged: {
        /**
         * Name of the new scene collection
         */
        sceneCollectionName: string;
    };
    SceneCollectionListChanged: {
        /**
         * Updated list of scene collections
         */
        sceneCollections: string[];
    };
    CurrentProfileChanging: {
        /**
         * Name of the current profile
         */
        profileName: string;
    };
    CurrentProfileChanged: {
        /**
         * Name of the new profile
         */
        profileName: string;
    };
    ProfileListChanged: {
        /**
         * Updated list of profiles
         */
        profiles: string[];
    };
    SourceFilterListReindexed: {
        /**
         * Name of the source
         */
        sourceName: string;
        /**
         * Array of filter objects
         */
        filters: JsonObject[];
    };
    SourceFilterCreated: {
        /**
         * Name of the source the filter was added to
         */
        sourceName: string;
        /**
         * Name of the filter
         */
        filterName: string;
        /**
         * The kind of the filter
         */
        filterKind: string;
        /**
         * Index position of the filter
         */
        filterIndex: number;
        /**
         * The settings configured to the filter when it was created
         */
        filterSettings: JsonObject;
        /**
         * The default settings for the filter
         */
        defaultFilterSettings: JsonObject;
    };
    SourceFilterRemoved: {
        /**
         * Name of the source the filter was on
         */
        sourceName: string;
        /**
         * Name of the filter
         */
        filterName: string;
    };
    SourceFilterNameChanged: {
        /**
         * The source the filter is on
         */
        sourceName: string;
        /**
         * Old name of the filter
         */
        oldFilterName: string;
        /**
         * New name of the filter
         */
        filterName: string;
    };
    SourceFilterEnableStateChanged: {
        /**
         * Name of the source the filter is on
         */
        sourceName: string;
        /**
         * Name of the filter
         */
        filterName: string;
        /**
         * Whether the filter is enabled
         */
        filterEnabled: boolean;
    };
    ExitStarted: undefined;
    InputCreated: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * The kind of the input
         */
        inputKind: string;
        /**
         * The unversioned kind of input (aka no \`_v2\` stuff)
         */
        unversionedInputKind: string;
        /**
         * The settings configured to the input when it was created
         */
        inputSettings: JsonObject;
        /**
         * The default settings for the input
         */
        defaultInputSettings: JsonObject;
    };
    InputRemoved: {
        /**
         * Name of the input
         */
        inputName: string;
    };
    InputNameChanged: {
        /**
         * Old name of the input
         */
        oldInputName: string;
        /**
         * New name of the input
         */
        inputName: string;
    };
    InputActiveStateChanged: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * Whether the input is active
         */
        videoActive: boolean;
    };
    InputShowStateChanged: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * Whether the input is showing
         */
        videoShowing: boolean;
    };
    InputMuteStateChanged: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * Whether the input is muted
         */
        inputMuted: boolean;
    };
    InputVolumeChanged: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * New volume level in multimap
         */
        inputVolumeMul: number;
        /**
         * New volume level in dB
         */
        inputVolumeDb: number;
    };
    InputAudioBalanceChanged: {
        /**
         * Name of the affected input
         */
        inputName: string;
        /**
         * New audio balance value of the input
         */
        inputAudioBalance: number;
    };
    InputAudioSyncOffsetChanged: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * New sync offset in milliseconds
         */
        inputAudioSyncOffset: number;
    };
    InputAudioTracksChanged: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * Object of audio tracks along with their associated enable states
         */
        inputAudioTracks: JsonObject;
    };
    InputAudioMonitorTypeChanged: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * New monitor type of the input
         */
        monitorType: string;
    };
    InputVolumeMeters: {
        /**
         * Array of active inputs with their associated volume levels
         */
        inputs: JsonObject[];
    };
    MediaInputPlaybackStarted: {
        /**
         * Name of the input
         */
        inputName: string;
    };
    MediaInputPlaybackEnded: {
        /**
         * Name of the input
         */
        inputName: string;
    };
    MediaInputActionTriggered: {
        /**
         * Name of the input
         */
        inputName: string;
        /**
         * Action performed on the input. See \`ObsMediaInputAction\` enum
         */
        mediaAction: string;
    };
    StreamStateChanged: {
        /**
         * Whether the output is active
         */
        outputActive: boolean;
        /**
         * The specific state of the output
         */
        outputState: string;
    };
    RecordStateChanged: {
        /**
         * Whether the output is active
         */
        outputActive: boolean;
        /**
         * The specific state of the output
         */
        outputState: string;
    };
    ReplayBufferStateChanged: {
        /**
         * Whether the output is active
         */
        outputActive: boolean;
        /**
         * The specific state of the output
         */
        outputState: string;
    };
    VirtualcamStateChanged: {
        /**
         * Whether the output is active
         */
        outputActive: boolean;
        /**
         * The specific state of the output
         */
        outputState: string;
    };
    ReplayBufferSaved: {
        /**
         * Path of the saved replay file
         */
        savedReplayPath: string;
    };
    SceneItemCreated: {
        /**
         * Name of the scene the item was added to
         */
        sceneName: string;
        /**
         * Name of the underlying source (input/scene)
         */
        sourceName: string;
        /**
         * Numeric ID of the scene item
         */
        sceneItemId: number;
        /**
         * Index position of the item
         */
        sceneItemIndex: number;
    };
    SceneItemRemoved: {
        /**
         * Name of the scene the item was removed from
         */
        sceneName: string;
        /**
         * Name of the underlying source (input/scene)
         */
        sourceName: string;
        /**
         * Numeric ID of the scene item
         */
        sceneItemId: number;
    };
    SceneItemListReindexed: {
        /**
         * Name of the scene
         */
        sceneName: string;
        /**
         * Array of scene item objects
         */
        sceneItems: JsonObject[];
    };
    SceneItemEnableStateChanged: {
        /**
         * Name of the scene the item is in
         */
        sceneName: string;
        /**
         * Numeric ID of the scene item
         */
        sceneItemId: number;
        /**
         * Whether the scene item is enabled (visible)
         */
        sceneItemEnabled: boolean;
    };
    SceneItemLockStateChanged: {
        /**
         * Name of the scene the item is in
         */
        sceneName: string;
        /**
         * Numeric ID of the scene item
         */
        sceneItemId: number;
        /**
         * Whether the scene item is locked
         */
        sceneItemLocked: boolean;
    };
    SceneItemSelected: {
        /**
         * Name of the scene the item is in
         */
        sceneName: string;
        /**
         * Numeric ID of the scene item
         */
        sceneItemId: number;
    };
    SceneItemTransformChanged: {
        /**
         * The name of the scene the item is in
         */
        sceneName: string;
        /**
         * Numeric ID of the scene item
         */
        sceneItemId: number;
        /**
         * New transform/crop info of the scene item
         */
        sceneItemTransform: JsonObject;
    };
    SceneCreated: {
        /**
         * Name of the new scene
         */
        sceneName: string;
        /**
         * Whether the new scene is a group
         */
        isGroup: boolean;
    };
    SceneRemoved: {
        /**
         * Name of the removed scene
         */
        sceneName: string;
        /**
         * Whether the scene was a group
         */
        isGroup: boolean;
    };
    SceneNameChanged: {
        /**
         * Old name of the scene
         */
        oldSceneName: string;
        /**
         * New name of the scene
         */
        sceneName: string;
    };
    CurrentProgramSceneChanged: {
        /**
         * Name of the scene that was switched to
         */
        sceneName: string;
    };
    CurrentPreviewSceneChanged: {
        /**
         * Name of the scene that was switched to
         */
        sceneName: string;
    };
    SceneListChanged: {
        /**
         * Updated array of scenes
         */
        scenes: JsonObject[];
    };
    CurrentSceneTransitionChanged: {
        /**
         * Name of the new transition
         */
        transitionName: string;
    };
    CurrentSceneTransitionDurationChanged: {
        /**
         * Transition duration in milliseconds
         */
        transitionDuration: number;
    };
    SceneTransitionStarted: {
        /**
         * Scene transition name
         */
        transitionName: string;
    };
    SceneTransitionEnded: {
        /**
         * Scene transition name
         */
        transitionName: string;
    };
    SceneTransitionVideoEnded: {
        /**
         * Scene transition name
         */
        transitionName: string;
    };
    StudioModeStateChanged: {
        /**
         * True == Enabled, False == Disabled
         */
        studioModeEnabled: boolean;
    };
    VendorEvent: {
        /**
         * Name of the vendor emitting the event
         */
        vendorName: string;
        /**
         * Vendor-provided event typedef
         */
        eventType: string;
        /**
         * Vendor-provided event data. {} if event does not provide any data
         */
        eventData: JsonObject;
    };
}
`;

let dest = src;

dest = dest.replace(/export interface (.+) {/, 'export const $1 = {');
dest = dest.replaceAll('};', '},');
dest = dest.replaceAll(/: string(.*);/g, ": 'string$1',");
dest = dest.replaceAll(/: JsonObject(.*);/g, ": 'object',");
dest = dest.replaceAll(/: JsonValue(.*);/g, ": 'value',");
dest = dest.replaceAll(/: boolean(.*);/g, ": 'boolean',");
dest = dest.replaceAll(/: number(.*);/g, ": 'number',");
dest = dest.replaceAll(': undefined;', ": 'undefined',");
dest = dest.replaceAll(': never;', ": 'never',");
dest = dest.replaceAll(/\?: '(.+)'/g, ": '$1?'");

console.log(dest);
