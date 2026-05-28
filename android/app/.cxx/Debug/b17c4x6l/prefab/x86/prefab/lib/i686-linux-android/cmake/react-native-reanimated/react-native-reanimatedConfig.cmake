if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "C:/Mobile Development/SpendWise/node_modules/react-native-reanimated/android/build/intermediates/cxx/Debug/644h665o/obj/x86/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Mobile Development/SpendWise/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

