from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from PIL import Image
import io

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/analisar-imagem':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Aqui você deve processar a imagem usando a IA
            try:
                image = Image.open(io.BytesIO(post_data))
                # Adicione aqui a lógica de análise com IA
                # Simulação de resposta da IA:
                resposta = "Sua caligrafia está melhorando! Continue praticando."
            except Exception as e:
                print(f"Erro ao processar imagem: {e}")
                resposta = "Erro ao processar a imagem."

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = json.dumps({'resposta': resposta})
            self.wfile.write(response.encode('utf-8'))

def run(server_class=HTTPServer, handler_class=RequestHandler, port=3000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Servidor HTTP rodando na porta {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
