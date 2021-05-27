FROM node:15-alpine3.10

ARG Mainteiner="Nick Lototskiy"
ARG Name="Minterest Frontend"
ARG Version="0.0.1"

ENV PORT=80
ENV HOST="0.0.0.0"

WORKDIR ui
COPY . .

RUN npm i --no-cache

ENTRYPOINT ["npm", "run"]
CMD ["start"]