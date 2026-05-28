if(NOT TARGET react-native-worklets::worklets)
add_library(react-native-worklets::worklets SHARED IMPORTED)
set_target_properties(react-native-worklets::worklets PROPERTIES
    IMPORTED_LOCATION "C:/Mobile Development/SpendWise/node_modules/react-native-worklets/android/build/intermediates/cxx/Debug/01o71437/obj/x86_64/libworklets.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Mobile Development/SpendWise/node_modules/react-native-worklets/android/build/prefab-headers/worklets"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

