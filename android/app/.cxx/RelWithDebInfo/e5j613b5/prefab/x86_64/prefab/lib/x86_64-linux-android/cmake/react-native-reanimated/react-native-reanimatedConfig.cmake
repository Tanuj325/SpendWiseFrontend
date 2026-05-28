if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "D:/Tanuj/Mobile Development/SpendWise/node_modules/react-native-reanimated/android/build/intermediates/cxx/RelWithDebInfo/15413ac2/obj/x86_64/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "D:/Tanuj/Mobile Development/SpendWise/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

