@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Jarvis + Equipe do Wesley ===
echo.
where python >nul 2>nul
if errorlevel 1 (
  echo Falta o Python. Vou abrir o site. Instale marcando "Add python.exe to PATH" e rode este arquivo de novo.
  start https://www.python.org/downloads/
  pause
  exit /b
)
where claude >nul 2>nul
if errorlevel 1 (
  echo Falta o Claude Code. Abra o PowerShell e cole:  irm https://claude.ai/install.ps1 ^| iex
  echo Depois rode "claude" uma vez para entrar na sua conta e rode este arquivo de novo.
  start https://claude.com/claude-code
  pause
  exit /b
)
echo Instalando os pacotes do Jarvis (pode baixar algumas centenas de MB)...
python instalar.py --dono "Victor"
python -c "import json;p='config.json';c=json.load(open(p,encoding='utf-8'));r=c.setdefault('regras_extras',[]);n=['Na operacao do Mestre Wesley: nada externo sai sem aprovacao do Victor ou do Wesley (publicar, agendar, mandar mensagem, mexer em campanha, pagina, oferta, preco ou checkout).','Nunca faca reembolso, pagamento ou cobranca, nem digite senha, chave ou numero de cartao.','Nunca grave telefone, e-mail, CPF ou nome completo de cliente em arquivo.'];[r.append(x) for x in n if x not in r];json.dump(c,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=2);print('[OK] Regras da operacao gravadas no config.json')"
if not "%WG_AVISO_TOKEN%"=="" goto teste
echo.
set /p "SENHA=Digite a senha da equipe (a mesma que voce pos na Cloudflare em AVISO_TOKEN) e aperte Enter: "
setx WG_AVISO_TOKEN "%SENHA%" >nul
set "WG_AVISO_TOKEN=%SENHA%"
echo [OK] Senha guardada no Windows.
:teste
echo.
echo Testando a conversa com o chefe da equipe...
python wg\wg.py chefe "Teste do Jarvis: responda so OK e a data de hoje."
echo.
echo Pronto. Abra o Jarvis pelo atalho da area de trabalho e diga: "Jarvis, como esta o financeiro?"
pause
