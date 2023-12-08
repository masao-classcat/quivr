import time

from models import File
from models.settings import get_supabase_db
from modules.brain.service.brain_vector_service import BrainVectorService
from packages.embeddings.vectors import Neurons
from repository.files.upload_file import DocumentSerializable

# masao : 12-oct-23
from logging import getLogger, StreamHandler, DEBUG
logger = getLogger(__name__)
handler = StreamHandler()
handler.setLevel(DEBUG)
logger.setLevel(DEBUG)
logger.addHandler(handler)
logger.propagate = False

async def process_file(
    file: File,
    loader_class,
    brain_id,
):
    logger.debug(f"### debug : IN : process_file (backend/packages/files/parsers/common.py)")
    database = get_supabase_db()
    dateshort = time.strftime("%Y%m%d")
    neurons = Neurons()

    # masao
    logger.debug(f"call file.compute_documents")
    file.compute_documents(loader_class)

    metadata = {
        "file_sha1": file.file_sha1,
        "file_size": file.file_size,
        "file_name": file.file_name,
        "chunk_size": file.chunk_size,
        "chunk_overlap": file.chunk_overlap,
        "date": dateshort,
    }
    docs = []

    if file.documents is not None:
        for doc in file.documents:  # pyright: ignore reportPrivateUsage=none
            doc_with_metadata = DocumentSerializable(
                page_content=doc.page_content, metadata=metadata
            )
            docs.append(doc_with_metadata)

    logger.debug(f">> DEBUG >> call create_vector")
    created_vector = neurons.create_vector(docs)

    brain_vector_service = BrainVectorService(brain_id)
    for created_vector_id in created_vector:
        brain_vector_service.create_brain_vector(
            created_vector_id, metadata["file_sha1"]
        )

    database.set_file_sha_from_metadata(metadata["file_sha1"])

    if created_vector:
        return len(created_vector)
    else:
        return 0
