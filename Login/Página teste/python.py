import pygame
import random
import math

# Inicializa o Pygame
pygame.init()

# Definindo cores
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Dimensões da tela
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Roleta")

# Definindo o relógio para controle da taxa de quadros
clock = pygame.time.Clock()
FPS = 60

# Definindo o centro e o raio da roleta
CENTER = (WIDTH // 2, HEIGHT // 2)
RADIUS = 200

# Definindo os setores da roleta
sectors = ['1', '2', '3', '4', '5', '6', '7', '8']
num_sectors = len(sectors)
angle = 360 / num_sectors

# Função para desenhar a roleta
def draw_roulette():
    for i in range(num_sectors):
        start_angle = math.radians(i * angle)
        end_angle = math.radians((i + 1) * angle)
        pygame.draw.arc(screen, GREEN if i % 2 == 0 else BLUE, 
                        (CENTER[0] - RADIUS, CENTER[1] - RADIUS, RADIUS * 2, RADIUS * 2), 
                        start_angle, end_angle, 10)
        # Desenha o texto
        text = font.render(sectors[i], True, BLACK)
        x = CENTER[0] + math.cos(start_angle + (end_angle - start_angle) / 2) * (RADIUS - 50)
        y = CENTER[1] + math.sin(start_angle + (end_angle - start_angle) / 2) * (RADIUS - 50)
        screen.blit(text, (x - text.get_width() // 2, y - text.get_height() // 2))

# Configurações de fonte
font = pygame.font.Font(None, 36)

# Variáveis de controle
running = True
spinning = False
current_angle = 0
spin_speed = 0

while running:
    # Lida com eventos
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and not spinning:
                # Começa a girar a roleta
                spinning = True
                spin_speed = random.randint(10, 20)

    # Limpa a tela
    screen.fill(WHITE)

    # Desenha a roleta
    draw_roulette()

    # Atualiza a tela
    pygame.display.flip()

    # Controla a taxa de quadros
    clock.tick(FPS)

# Finaliza o Pygame
pygame.quit()
