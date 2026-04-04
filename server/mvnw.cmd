@REM Maven Wrapper script for Windows
@REM Copyright 2007-2021 The Apache Software Foundation

@echo off
setlocal

set WRAPPER_JAR="%~dp0\.mvn\wrapper\maven-wrapper.jar"

if defined JAVA_HOME (
    set JAVACMD="%JAVA_HOME%\bin\java.exe"
) else (
    set JAVACMD="java"
)

%JAVACMD% %MAVEN_OPTS% -jar %WRAPPER_JAR% %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
endlocal & exit /B %ERROR_CODE%
