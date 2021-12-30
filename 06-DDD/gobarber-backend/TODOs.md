# Recuperação da senha

**RF**
- O usuário deve poder recuperar sua senha informando o seu email.
- O usuário deve receber um email com as intruções de recuperação de senha;
- O usuário deve poder resetar sua senha.

**RNF**
- Utilizar Mailtrap para envio de emails em desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**
- O link enviado por email para resetar a senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha; (colocar 2x)

# Atualização do perfil

**RF**
- O usuário deve poder atualizar o seu nome, email e senha.

**RN**
- O usuário não pode alterar o seu email para um email já utilizado;
- Para atualizar a sua senha, o usuário precisa informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;


# Painel do prestador

**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificaçõesnão lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- AS notificações de prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**
- A notificação deve ter um status de lida ou não lida, para que o prestador possa ser informado;

# Agendamento de serviços

**RF**
- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestadoro;
- O usuário deve poder listar horários disponíveis de um prestador.
- O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**
- Listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro ás 8h, último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário no passado;
- O usuário não pode agendar serviços consigo mesmo;
