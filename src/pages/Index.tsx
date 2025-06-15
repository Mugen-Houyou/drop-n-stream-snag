import React, { useState } from "react";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Video, CheckCircle2, Info, RefreshCcw } from "lucide-react";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // 실제 변환 로직은 추후 Electron backend 연동 필요
  const simulateConvert = () => {
    setIsConverting(true);
    setProgress(0);
    setIsDone(false);
    // Progress simulation
    let percent = 0;
    const timer = setInterval(() => {
      percent += Math.max(1, Math.random() * 20);
      setProgress(Math.min(percent, 100));
      if (percent >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsConverting(false);
          setIsDone(true);
        }, 500);
      }
    }, 500);
  };

  const handleFileSelected = (file: File) => {
    setFile(file);
    setIsDone(false);
    setProgress(0);
  };

  const handleReset = () => {
    setFile(null);
    setIsDone(false);
    setProgress(0);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-8 pb-16">
      <header className="w-full max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-4 mt-8 mb-6">
        <Video className="w-11 h-11 text-primary mr-2" />
        <div>
          <h1 className="text-3xl font-bold">HLS to MP4 Converter</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs font-medium">
              Electron 데스크톱 App
            </Badge>
            <span className="text-muted-foreground text-sm">
              m3u8 → MP4 변환 <span className="hidden md:inline">| Drag & Drop 지원</span>
            </span>
          </div>
        </div>
      </header>

      <main className="w-full flex flex-col items-center mt-2">
        <DropZone
          onFileSelected={handleFileSelected}
          disabled={isConverting}
          file={file}
        />

        {file && !isConverting && !isDone && (
          <div className="flex gap-2 mt-6">
            <Button onClick={simulateConvert} disabled={isConverting || !file}>
              변환 시작
            </Button>
            <Button variant="outline" onClick={handleReset}>
              파일 변경
            </Button>
          </div>
        )}

        {isConverting && (
          <div className="w-full flex flex-col items-center mt-7">
            <ProgressBar value={progress} />
            <span className="mt-2 text-primary text-sm flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 animate-spin" />
              변환 중...
            </span>
          </div>
        )}

        {isDone && (
          <Alert variant="default" className="w-full max-w-xl mt-7">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <AlertTitle>MP4 파일 변환 완료!</AlertTitle>
            <AlertDescription>
              변환된 파일은 (예시) <b>C:\Users\username\Downloads</b>에 저장되었습니다.<br />
              실제 Electron 연동 시, 다운로드 위치를 직접 지정할 수 있습니다.<br />
              <Button
                className="mt-3"
                variant="secondary"
                onClick={handleReset}
              >
                다른 파일 변환하기
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="w-full max-w-xl mt-10 px-2">
          <Alert className="w-full">
            <Info className="w-5 h-5" />
            <AlertTitle>안내</AlertTitle>
            <AlertDescription>
              <ul className="list-disc ml-4 mt-1 space-y-1 text-sm">
                <li>m3u8 파일을 데스크톱에서 마우스로 올려 변환할 수 있습니다.</li>
                <li>
                  실제 MP4 변환은 Electron 메인프로세스에서 ffmpeg로 처리해야 하며,
                  이 화면은 데스크톱 UI 프로토타입입니다.
                </li>
                <li>
                  <b>MP4 저장 위치 안내/설정 및 변환 속도 등은 Electron 연동 후 지원됩니다.</b>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  );
};

export default Index;
