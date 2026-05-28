if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "C:/Users/tanuj/.gradle/caches/8.13/transforms/ea8bafcafc2c6c325031eaffe24fde9a/transformed/hermes-android-0.14.0-release/prefab/modules/hermesvm/libs/android.x86/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/tanuj/.gradle/caches/8.13/transforms/ea8bafcafc2c6c325031eaffe24fde9a/transformed/hermes-android-0.14.0-release/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

